import { Schema } from 'mongoose';

import { EmailTemplate } from '@/features/email/types/Email';

export const emailTemplateSchema = new Schema<EmailTemplate>(
  {
    name: { type: String, required: true },
    trigger: { type: String, required: true },
    subject: { type: String, required: true },
    heroSection: { type: String, required: true },
    body: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);
