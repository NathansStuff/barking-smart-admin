import { createAccountService, getAccountByEmailService } from '@/features/account/server/accountService';
import { createUserService } from '@/features/user/server/userService';
import { EUserRole } from '@/features/user/types/EUserRole';
import { UserWithId } from '@/features/user/types/User';
import { BadRequestError } from '@/middleware/errors/BadRequestError';

import { SignupFormRequest } from '../types/SignupFormRequest';
import { hashPassword } from '../utils/auth';

export async function registerUserService(request: SignupFormRequest, ipAddress: string): Promise<UserWithId> {
  const { email, password } = request;
  const existingAccount = await getAccountByEmailService(email);

  if (existingAccount) {
    throw new BadRequestError('Account already exists');
  }

  const username = 'username'; // Generate username
  // Create user first
  const newUser = await createUserService(
    {
      email,
      name: username,
      activeSubscription: false,
      isEmailVerified: false,
      oneTimePurchases: [],
      currentPlan: null,
      preferredName: username,
      role: EUserRole.USER,
      preferences: {
        //todo
        emailNotifications: true,
        activityReminders: true,
        personalizedSuggestions: true,
      },
    },
    ipAddress
  );
  // Hash password and create account
  const hashedPassword = await hashPassword(password);
  await createAccountService(
    newUser._id,
    'credentials',
    newUser._id.toString(), // Link to user
    email,
    hashedPassword
  );

  return newUser;
}
