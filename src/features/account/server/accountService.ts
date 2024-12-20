import { ObjectId } from 'mongodb';

import { env } from '@/constants';
import {
  createAccount,
  deleteAccountById,
  getAccountByEmail,
  getAccountById,
  getAccountByProviderAndProviderId,
  getAccountByResetToken,
  getAccountsByUserId,
  saveResetTokenToAccount,
  updateAccountById,
} from '@/features/account/db/accountDal';
import { AccountPartial, AccountWithId } from '@/features/account/types/Account';
import { LoginRequest } from '@/features/auth/types/LoginRequest';
import { hashPassword } from '@/features/auth/utils/auth';
import connectMongo from '@/features/database/lib/mongodb';
import { passwordResetConfirmationEmailTemplate } from '@/features/email/templates/passwordResetConfirmationEmailTemplate';
import { resetPasswordEmailTemplate } from '@/features/email/templates/resetPasswordEmailTemplate';
import { Email } from '@/features/email/types/Email';
import { sendEmail } from '@/features/email/utils/sendEmail';
import { createUserService, getUserByEmailService, getUserByIdService } from '@/features/user/server/userService';
import { EUserRole } from '@/features/user/types/EUserRole';
import { UserWithId } from '@/features/user/types/User';
import { generateRandomToken } from '@/utils/generateRandomToken';

// ***** Basic CRUD *****
// Service to get a Account by ID
export async function getAccountByIdService(id: string): Promise<AccountWithId | null> {
  return await getAccountById(id);
}

// Service to update a Account by ID
export async function updateAccountByIdService(id: string, Account: AccountPartial): Promise<AccountWithId | null> {
  return await updateAccountById(id, Account);
}

// Service to delete a Account by ID
export async function deleteAccountByIdService(id: string): Promise<void> {
  return await deleteAccountById(id);
}

// ***** Additional Functions *****
// Service to link account to a user
export async function linkAccountToUser(user: UserWithId, provider: string, providerId: string): Promise<void> {
  const existingAccount = await getAccountByProviderAndProviderId(provider, providerId);
  if (!existingAccount) {
    await createAccount({
      userId: user._id,
      provider,
      email: user.email,
      providerId,
    });
  }
}

// Service to handle user login or account creation
export async function handleUserLoginOrCreate(request: LoginRequest, ipAddress: string): Promise<UserWithId | null> {
  const { provider, providerId, name, email, imageUrl } = request;
  const existingAccount = await getAccountByProviderAndProviderId(provider, providerId);
  console.log('existingAccount', existingAccount);

  // If account exists, return associated user
  if (existingAccount) {
    const user = await getUserByIdService(existingAccount.userId.toString());
    return user;
  }

  // If account does not exist, check if the user exists by email
  const existingUser = await getUserByEmailService(email);
  console.log('existingUser', existingUser);
  // If user with same email exists but different provider, fail login
  if (existingUser) {
    throw new Error(
      'Account with this email already exists using a different login method. Please log in with the correct provider or link this provider to your account after logging in.'
    );
  }

  console.log('handleUserLoginOrCreate provider', provider);

  // If user does not exist, create new user and link account
  const newUser = await createUserService(
    {
      name,
      preferredName: name,
      email,
      imageUrl: imageUrl || undefined,
      isEmailVerified: true,
      oneTimePurchases: [],
      preferences: {
        emailNotifications: true,
        activityReminders: true,
        personalizedSuggestions: true,
      },
      role: EUserRole.USER,
      activeSubscription: false,
      currentPlan: null,
    },
    ipAddress
  );
  console.log('newUser', newUser);
  await linkAccountToUser(newUser, provider, providerId);
  return newUser;
}

export async function getAccountByEmailService(email: string): Promise<AccountWithId | null> {
  return await getAccountByEmail(email);
}

export async function createAccountService(
  userId: ObjectId,
  provider: string,
  providerId: string,
  email: string,
  passwordHash: string
): Promise<AccountWithId> {
  await connectMongo();
  const account = await createAccount({
    userId,
    provider,
    providerId,
    email,
    passwordHash,
  });
  return account;
}

export async function getAccountsByUserIdService(userId: string): Promise<AccountWithId[]> {
  return await getAccountsByUserId(userId);
}

export async function resetPasswordRequestAction(email: string, ipAddress: string): Promise<void> {
  const account = await getAccountByEmailService(email);
  if (!account) {
    return; // We don't want to reveal if an email is in the system or not
  }

  const token = generateRandomToken();
  await saveResetTokenToAccount(email, token);

  const user = await getUserByEmailService(email);
  if (!user) {
    return;
  }

  // Send email
  const { body, subject } = resetPasswordEmailTemplate(
    user.name,
    `${env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`
  );
  const emailTemplate: Email = {
    to: email,
    subject,
    body,
    userId: user._id,
    ipAddress,
  };

  await sendEmail(emailTemplate);
}

export async function validateToken(token: string): Promise<boolean> {
  const account = await getAccountByResetToken(token);
  if (!account || !account.resetTokenExpiry) {
    return false;
  }

  // Check if the token has expired
  const currentTime = new Date();
  if (currentTime > account.resetTokenExpiry) {
    return false;
  }

  return account.resetToken === token;
}

export async function resetPasswordAction(token: string, password: string, ipAddress: string): Promise<boolean> {
  const account = await getAccountByResetToken(token);
  if (!account || !account.resetTokenExpiry) {
    return false; // We don't want to reveal if an email is in the system or not
  }

  // Check if the token has expired
  const currentTime = new Date();
  if (currentTime > account.resetTokenExpiry) {
    return false;
  }

  const passwordHash = await hashPassword(password);

  // Save new password
  await updateAccountById(
    account._id.toHexString(),
    {
      passwordHash,
      resetToken: null,
      resetTokenExpiry: null,
    },
    ipAddress
  );

  const user = await getUserByEmailService(account.email);
  if (!user) {
    return false;
  }

  // Send email
  const { body, subject } = passwordResetConfirmationEmailTemplate(user.name);
  const emailTemplate: Email = {
    to: account.email,
    subject,
    body,
    userId: user._id,
    ipAddress,
  };

  await sendEmail(emailTemplate);

  return true;
}
