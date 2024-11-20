import { passwordResetConfirmationEmailTemplate } from '../templates/passwordResetConfirmationEmailTemplate';
import { purchaseConfirmationEmailTemplate } from '../templates/purchaseConfirmationEmailTemplate';
import { resendEmailVerificationTemplate } from '../templates/resendEmailVerificationTemplate';
import { resetPasswordEmailTemplate } from '../templates/resetPasswordEmailTemplate';
import { verifyEmailTemplate } from '../templates/verifyEmailTemplate';

export function generateEmailTemplate(
  templateId: string,
  variables: Record<string, string>
):
  | {
      body: string;
      subject: string;
    }
  | undefined {
  switch (templateId) {
    case 'password-reset-confirmation':
      return passwordResetConfirmationEmailTemplate(variables.firstName);

    case 'reset-password':
      return resetPasswordEmailTemplate(variables.firstName, variables.resetPasswordLink);

    case 'resend-email-verification':
      return resendEmailVerificationTemplate(variables.firstName, variables.verificationLink);

    case 'verify-email':
      return verifyEmailTemplate(variables.firstName, variables.verificationLink);

    case 'purchase-confirmation':
      return purchaseConfirmationEmailTemplate(variables.firstName, variables.productName, variables.viewProductLink);

    default:
      return undefined;
  }
}
