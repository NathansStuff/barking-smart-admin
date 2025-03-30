import { emailLoggingMiddleware } from '@/middleware/emailLoggingMiddleware';

import brevoService from '../server/brevoService';
import { Email } from '../types/Email';
import { EmailService } from '../types/EmailService';

const emailService: EmailService = emailLoggingMiddleware(brevoService);

// Wrap the emailService to ignore the return value when not needed
export const sendEmail = async (email: Email): Promise<void> => {
  await emailService(email);
};
