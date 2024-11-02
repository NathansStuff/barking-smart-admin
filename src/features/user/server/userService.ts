import {
  deleteAccountByIdService,
  getAccountsByUserIdService,
} from '@/features/account/server/accountService';
import {
  createUser,
  deleteUserById,
  getUserByEmail,
  getUserById,
  getUserByStripeCustomerId,
  updateUserById,
} from '@/features/user/db/userDal';
import { User, UserPartial, UserWithId } from '@/features/user/types/User';
import connectMongo from '@/lib/mongodb';

import { UserModel } from '../db/userModel';

// ***** Basic CRUD *****
// Service to create a user
export async function createUserService(
  user: User,
  ipAddress: string
): Promise<UserWithId> {
  const newUser = await createUser(user);
  console.log(ipAddress);
  return newUser;
}

// Service to get all users
interface GetUsersOptions {
  page?: number;
  limit?: number;
  filters?: {
    name?: string;
    email?: string;
    role?: string;
  };
}

export async function getAllUsersService(
  options: GetUsersOptions = {}
): Promise<{
  users: UserWithId[];
  total: number;
  page: number;
  totalPages: number;
}> {
  await connectMongo();

  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Build filter query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};
  if (options.filters?.name) {
    filter.name = { $regex: options.filters.name, $options: 'i' };
  }
  if (options.filters?.email) {
    filter.email = { $regex: options.filters.email, $options: 'i' };
  }
  if (options.filters?.role) {
    filter.role = options.filters.role;
  }

  // Get total count for pagination
  const total = await UserModel.countDocuments(filter);

  // Get paginated results
  const users = await UserModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

// Service to get a user by ID
export async function getUserByIdService(
  id: string
): Promise<UserWithId | null> {
  return await getUserById(id);
}

// Service to get a user by Stripe Customer ID
export async function getUserByStripeCustomerIdService(
  stripeCustomerId: string
): Promise<UserWithId | null> {
  return await getUserByStripeCustomerId(stripeCustomerId);
}

// Service to update a user by ID
export async function updateUserByIdService(
  id: string,
  user: UserPartial,
  ipAddress?: string | null
): Promise<UserWithId | null> {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    return null;
  }

  const updatedUser = await updateUserById(id, user, ipAddress);

  return updatedUser;
}
// Service to delete a user by ID
export async function deleteUserByIdService(id: string): Promise<void> {
  return await deleteUserById(id);
}

// ***** Additional Functions *****
// Service to find or create a user by email
export async function findOrCreateUserByEmail(
  email: string,
  user: User,
  ipAddress: string
): Promise<UserWithId> {
  let existingUser = await getUserByEmail(email);
  if (!existingUser) {
    existingUser = await createUserService(user, ipAddress);
  }
  return existingUser;
}

// Service to get a user by Email
export async function getUserByEmailService(
  email: string
): Promise<UserWithId | null> {
  return await getUserByEmail(email);
}

// Service to delete a user and all linked accounts
export async function deleteUserAndAccounts(userId: string): Promise<void> {
  // Fetch all accounts linked to the user
  const accounts = await getAccountsByUserIdService(userId);

  // Delete all accounts
  for (const account of accounts) {
    await deleteAccountByIdService(account._id.toString());
  }

  // Delete the user
  await deleteUserById(userId);
}
