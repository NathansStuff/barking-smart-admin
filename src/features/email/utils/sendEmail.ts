import { emailLoggingMiddleware } from '@/middleware/emailLoggingMiddleware';

import nodemailerService from '../server/nodemailerService';
import { EmailService } from '../types/EmailService';

let emailService: EmailService;

// eslint-disable-next-line prefer-const
emailService = emailLoggingMiddleware(nodemailerService);

export const sendEmail = emailService.sendEmail;
