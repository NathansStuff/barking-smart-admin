import { ObjectId } from 'mongodb';

import { env } from '@/constants';
import { contactEmailNotificationTemplate } from '@/features/email/templates/contactEmailNotificationTemplate';
import { EmailRequest } from '@/features/email/types/EmailRequest';
import { sendEmail } from '@/features/email/utils/sendEmail';

import { ContactEmailRequest } from '../types/ContactEmailRequest';

export function sendContactEmail(request: ContactEmailRequest, ipAddress: string): Promise<void> {
  const toEmails = env.CONTACT_EMAIL_ADDRESS;
  const { body, subject } = contactEmailNotificationTemplate(request);
  let userId: ObjectId | null = null;
  if (request.userId) {
    userId = new ObjectId(request.userId);
  }

  const email: EmailRequest = {
    to: toEmails,
    subject,
    body,
    userId,
    ipAddress,
  };

  return sendEmail(email);
}
