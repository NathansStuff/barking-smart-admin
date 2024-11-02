import { ObjectId } from 'mongodb';

import {
  createAccount,
  deleteAccountById,
  getAccountByEmail,
  getAccountById,
  getAccountByProviderAndProviderId,
  getAccountsByUserId,
  updateAccountById,
} from '@/features/account/db/accountDal';
import {
  AccountPartial,
  AccountWithId,
} from '@/features/account/types/Account';
import { LoginRequest } from '@/features/auth/types/LoginRequest';
import {
  createUserService,
  getUserByEmailService,
  getUserByIdService,
} from '@/features/user/server/userService';
import { EUserRole } from '@/features/user/types/EUserRole';
import { UserWithId } from '@/features/user/types/User';
import connectMongo from '@/lib/mongodb';

// ***** Basic CRUD *****
// Service to get a Account by ID
export async function getAccountByIdService(
  id: string
): Promise<AccountWithId | null> {
  return await getAccountById(id);
}

// Service to update a Account by ID
export async function updateAccountByIdService(
  id: string,
  Account: AccountPartial
): Promise<AccountWithId | null> {
  return await updateAccountById(id, Account);
}

// Service to delete a Account by ID
export async function deleteAccountByIdService(id: string): Promise<void> {
  return await deleteAccountById(id);
}

// ***** Additional Functions *****
// Service to link account to a user
export async function linkAccountToUser(
  user: UserWithId,
  provider: string,
  providerId: string
): Promise<void> {
  const existingAccount = await getAccountByProviderAndProviderId(
    provider,
    providerId
  );
  if (!existingAccount) {
    await createAccount({
      userId: user._id,
      provider,
      email: user.email ?? '',
      providerId,
    });
  }
}

// Service to handle user login or account creation
export async function handleUserLoginOrCreate(
  request: LoginRequest,
  ipAddress: string
): Promise<UserWithId | null> {
  const { provider, providerId, name, email, imageUrl } = request;
  const existingAccount = await getAccountByProviderAndProviderId(
    provider,
    providerId
  );
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
      email,
      imageUrl: imageUrl || undefined,
      role: EUserRole.PENDING,
    },
    ipAddress
  );
  console.log('newUser', newUser);
  await linkAccountToUser(newUser, provider, providerId);
  return newUser;
}

export async function getAccountByEmailService(
  email: string
): Promise<AccountWithId | null> {
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

export async function getAccountsByUserIdService(
  userId: string
): Promise<AccountWithId[]> {
  return await getAccountsByUserId(userId);
}
