import { Schema } from 'mongoose';

import { ELocation } from '@/features/program/types/ELocation';

import { Dog } from '../types/Dog';
import { EBreed } from '../types/EBreed';
import { EGender } from '../types/EGender';
import { EHealthIssues } from '../types/EHealthIssues';

export const dogSchema = new Schema<Dog>(
  {
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    purebred: { type: Boolean, required: true },
    breedOne: { type: String, required: true, enum: Object.values(EBreed) },
    breedTwo: { type: String, required: false, enum: Object.values(EBreed) },
    gender: { type: String, required: true, enum: Object.values(EGender) },
    profileUrl: { type: String, required: false },
    bio: { type: String, required: false },
    desexed: { type: Boolean, required: true },
    healthIssues: {
      type: String,
      required: false,
      enum: Object.values(EHealthIssues),
    },
    howActive: { type: Number, required: true, min: 1, max: 10 },
    weight: { type: Number, required: false },
    foodOrientated: { type: Boolean, required: true },
    location: { type: String, required: true, enum: Object.values(ELocation) },
  },
  { timestamps: true }
);
