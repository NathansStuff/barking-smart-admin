import { EmailRecipient } from './EmailRecipient';

export enum BrevoTemplateId {
  PASSWORD_CHANGED = 11,
  RESET_PASSWORD_REQUEST = 10,
  VERIFY_EMAIL = 7,
  CONTACT_EMAIL_NOTIFICATION = 15,
  SUBSCRIPTION_CONFIRMATION = 12,
  SUBSCRIPTION_CANCELLATION_REQUEST = 13,
  PURCHASE_CONFIRMATION = 0, // note: not active in this repo
}

export interface BrevoEmailRequest {
  to: EmailRecipient[];
  templateId: BrevoTemplateId;
  params: Record<string, string>;
}
