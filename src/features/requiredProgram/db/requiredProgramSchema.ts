import { Schema } from 'mongoose';

import { RequiredProgramWithId } from '../types/RequiredProgram';

export const requiredProgramSchema = new Schema<RequiredProgramWithId>(
  {
    tags: { type: Object, required: true },
    count: { type: Number, required: true, min: 1 },
  },
  { timestamps: true }
);
