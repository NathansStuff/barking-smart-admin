import { model, models } from 'mongoose';

import { EmailTemplate } from '@/features/email/types/EmailTemplate';

import { emailTemplateSchema } from './emailTemplateSchema';

export const EmailTemplateModel = models.EmailTemplate || model<EmailTemplate>('EmailTemplate', emailTemplateSchema);
