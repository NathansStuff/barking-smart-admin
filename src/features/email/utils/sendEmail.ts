import { emailLoggingMiddleware } from '@/middleware/emailLoggingMiddleware';

import nodemailerService from '../server/nodemailerService';
import { Email } from '../types/Email';

const emailService = emailLoggingMiddleware(nodemailerService);

export async function sendEmail(emailData: Email): Promise<void> {
  return await emailService.sendEmail(emailData);
}
