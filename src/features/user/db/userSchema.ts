import { Schema } from 'mongoose';

import { User } from '@/features/user/types/User';

import { EUserRole } from '../types/EUserRole';

export const userSchema = new Schema<User>(
  {
    role: { type: String, required: true, default: EUserRole.USER },
    name: { type: String, required: true },
    preferredName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: false },
    stripeCustomerId: { type: String, required: false },
    isEmailVerified: { type: Boolean, required: true, default: false },
    oneTimePurchases: { type: [String], required: true, default: [] },
    receiptUrls: { type: [String], required: true, default: [] },
    preferences: {
      type: {
        emailNotifications: { type: Boolean, required: true, default: true },
        activityReminders: { type: Boolean, required: true, default: true },
        personalizedSuggestions: { type: Boolean, required: true, default: true },
      },
      required: true,
    },
  },
  { timestamps: true }
);
