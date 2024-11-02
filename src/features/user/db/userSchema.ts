import { Schema } from 'mongoose';

import { EUserRole } from '@/features/user/types/EUserRole';
import { User } from '@/features/user/types/User';

export const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    imageUrl: { type: String, required: false },
    name: { type: String, required: false },
    role: { type: String, required: true, enum: Object.values(EUserRole) },
  },
  { timestamps: true }
);
