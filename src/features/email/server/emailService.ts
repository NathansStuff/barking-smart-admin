import { BadRequestError } from '@/exceptions';
import { getUserByEmailService } from '@/features/user/server/userService';

import { Email } from '../types/Email';
import { generateEmailTemplate } from '../utils/getEmailTemplate';
import { sendEmail } from '../utils/sendEmail';

export async function sendTestEmail(
  templateId: string,
  variables: Record<string, string>,
  toEmail: string,
  ipAddress: string
): Promise<void> {
  const email = generateEmailTemplate(templateId, variables);

  if (!email) {
    throw new BadRequestError(`Unknown template ID: ${templateId}`);
  }
  const { body, subject } = email;
  const user = await getUserByEmailService(toEmail);
  if (!user) {
    throw new BadRequestError(`Unknown user email: ${toEmail}`);
  }

  const emailTemplate: Email = {
    to: toEmail,
    subject,
    body,
    ipAddress,
    userId: user._id,
    test: true,
  };
  console.log(emailTemplate);
  await sendEmail(emailTemplate);
}
