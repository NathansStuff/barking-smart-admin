import { EmailType } from './EmailType';

export interface BaseEmailParams {
  firstName: string;
}

export interface ContactEmailParams extends BaseEmailParams {
  email: string;
  subject: string;
  message: string;
}

export interface PasswordParams extends BaseEmailParams {
  email: string;
}

export interface ResetPasswordParams extends BaseEmailParams {
  resetPasswordLink: string;
}

export interface VerificationEmailParams extends BaseEmailParams {
  verificationLink: string;
}

export interface SubscriptionParams extends BaseEmailParams {
  planName: string;
  nextBillingDate?: string;
  cancellationDate?: string;
  endDate?: string;
}

export interface PurchaseConfirmationParams extends BaseEmailParams {
  productName: string;
  price: string;
  viewProductLink: string;
}

export type EmailTemplateParams = {
  [EmailType.PASSWORD_CHANGED]: PasswordParams;
  [EmailType.RESET_PASSWORD_REQUEST]: ResetPasswordParams;
  [EmailType.VERIFY_EMAIL]: VerificationEmailParams;
  [EmailType.CONTACT_EMAIL_NOTIFICATION]: ContactEmailParams;
  [EmailType.SUBSCRIPTION_CONFIRMATION]: SubscriptionParams;
  [EmailType.SUBSCRIPTION_CANCELLATION_REQUEST]: SubscriptionParams;
  [EmailType.PURCHASE_CONFIRMATION]: PurchaseConfirmationParams;
};
