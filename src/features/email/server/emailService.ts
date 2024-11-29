import { BadRequestError } from '@/exceptions';
import { getUserByEmailService } from '@/features/user/server/userService';

import { EmailTemplateDal } from '../db/emailTemplateDal';
import { EmailTemplatePartial, EmailTemplateWithId } from '../types/Email';
import { EmailTemplate } from '../types/Email';
import { EmailRequest } from '../types/EmailRequest';
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

  const emailTemplate: EmailRequest = {
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

export async function getAllEmailTemplatesService(): Promise<{
  emailTemplates: EmailTemplateWithId[];
  total: number;
}> {
  return await EmailTemplateDal.getAll();
}

export async function createEmailTemplateService(emailTemplate: EmailTemplate): Promise<EmailTemplateWithId> {
  return await EmailTemplateDal.create(emailTemplate);
}

export async function getEmailTemplateByIdService(id: string): Promise<EmailTemplateWithId | null> {
  return await EmailTemplateDal.getById(id);
}

export async function updateEmailTemplateService(
  id: string,
  emailTemplate: EmailTemplatePartial
): Promise<EmailTemplateWithId | null> {
  return await EmailTemplateDal.update(id, emailTemplate);
}

export async function deleteEmailTemplateService(id: string): Promise<void> {
  await EmailTemplateDal.delete(id);
}
