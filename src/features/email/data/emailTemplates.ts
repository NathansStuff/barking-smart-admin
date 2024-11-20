import { passwordResetConfirmationEmail } from '../templates/passwordResetConfirmationEmailTemplate';
import { purchaseConfirmationEmail } from '../templates/purchaseConfirmationEmailTemplate';
import { resendEmailVerification } from '../templates/resendEmailVerificationTemplate';
import { resetPasswordEmail } from '../templates/resetPasswordEmailTemplate';
import { verifyEmail } from '../templates/verifyEmailTemplate';
import { EmailTemplate } from '../types/EmailTemplate';

export const emailTemplates: EmailTemplate[] = [
  passwordResetConfirmationEmail,
  purchaseConfirmationEmail,
  resendEmailVerification,
  resetPasswordEmail,
  verifyEmail,
];
