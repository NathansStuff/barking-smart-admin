import { WithId } from 'mongodb';
import { z } from 'zod';

import { EUserRole } from './EUserRole';

export const User = z.object({
  email: z.string().email().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  name: z.string().nullable().optional(),
  role: z.nativeEnum(EUserRole),
});

export const UserPartial = User.partial();

export type User = z.infer<typeof User>;
export type UserPartial = z.infer<typeof UserPartial>;
export type UserWithId = WithId<User>;
