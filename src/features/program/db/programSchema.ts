import { Schema } from 'mongoose';

import { Program } from '../types/Program';

export const programSchema = new Schema<Program>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    materialsNeeded: { type: String, required: true },
    setup: { type: String, required: true },
    instructions: { type: String, required: true },
    additionalTips: { type: String, required: true },
    canvaLink: { type: String, required: false },
    pdfLink: { type: String, required: false },
    approved: { type: Boolean, default: false },
    tags: { type: Object, required: true },
  },
  { timestamps: true }
);
