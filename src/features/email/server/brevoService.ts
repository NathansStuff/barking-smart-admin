import { env } from '@/constants/env';

import { BrevoEmailRequest, BrevoTemplateId } from '../types/BrevoTypes';
import { Email } from '../types/Email';
import { EmailType } from '../types/EmailType';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

const getTemplateIdForEmail = (emailType: EmailType): BrevoTemplateId => {
  switch (emailType) {
    case EmailType.PASSWORD_CHANGED:
      return BrevoTemplateId.PASSWORD_CHANGED;
    case EmailType.RESET_PASSWORD_REQUEST:
      return BrevoTemplateId.RESET_PASSWORD_REQUEST;
    case EmailType.VERIFY_EMAIL:
      return BrevoTemplateId.VERIFY_EMAIL;
    case EmailType.CONTACT_EMAIL_NOTIFICATION:
      return BrevoTemplateId.CONTACT_EMAIL_NOTIFICATION;
    case EmailType.SUBSCRIPTION_CONFIRMATION:
      return BrevoTemplateId.SUBSCRIPTION_CONFIRMATION;
    case EmailType.SUBSCRIPTION_CANCELLATION_REQUEST:
      return BrevoTemplateId.SUBSCRIPTION_CANCELLATION_REQUEST;
    default:
      throw new Error('No matching Brevo template found for this email type');
  }
};

function convertParamsToRecord(params: object): Record<string, string> {
  const record: Record<string, string> = {};
  for (const [key, value] of Object.entries(params)) {
    record[key] = String(value);
  }
  return record;
}

export default async function brevoService(email: Email): Promise<unknown> {
  // Log attempt in all environments
  const { to, emailType, params } = email;

  const templateId = getTemplateIdForEmail(emailType);
  console.log('emailType', emailType, 'templateId', templateId);

  const payload: BrevoEmailRequest = {
    to,
    templateId,
    params: convertParamsToRecord(params),
  };

  // Skip actual email sending in non-production environments
  if (env.NEXT_PUBLIC_ENVIRONMENT !== 'production') {
    console.log('brevoService: Skipping email send in non-production environment');
    console.log('brevoService: Would have sent email with payload:', payload);
    return { message: 'Email skipped in non-production environment' };
  }

  try {
    const response = await fetch(BREVO_API_URL, {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Brevo API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('brevoService: Error sending email:', error);
    throw error;
  }
}
