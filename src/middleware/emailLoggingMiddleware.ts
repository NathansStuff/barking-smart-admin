import { Email } from '@/features/email/types/Email';
import { EmailService } from '@/features/email/types/EmailService';
import { createServerLogService } from '@/features/log/server/logService';
import { ELogStatus } from '@/features/log/types/ELogStatus';
import { ELogType } from '@/features/log/types/ELogType';
import { Log } from '@/features/log/types/Log';

export function emailLoggingMiddleware(emailService: EmailService): EmailService {
  return {
    async sendEmail(email: Email): Promise<void> {
      const logType = email.test ? ELogType.EMAIL_TEST : ELogType.EMAIL_SENT;
      console.log('Starting emailLoggingMiddleware.sendEmail');
      const baseLog: Log = {
        userId: email.userId,
        action: logType,
        ipAddress: email.ipAddress,
        status: ELogStatus.IN_PROGRESS,
        details: `Sending email to ${email.to} with subject ${email.subject}`,
      };

      try {
        console.log('Calling original emailService.sendEmail');
        await emailService.sendEmail(email);
        console.log('Original emailService.sendEmail completed');

        // Log success
        await createServerLogService({
          ...baseLog,
          status: ELogStatus.SUCCESS,
          details: `Email sent successfully to ${email.to} with subject ${email.subject}`,
        });
      } catch (error) {
        let errorDetails = 'An unknown error occurred';

        if (error instanceof Error) {
          errorDetails = error.message;
        }

        // Log failure
        await createServerLogService({
          ...baseLog,
          status: ELogStatus.FAILURE,
          details: `Failed to send email to ${email.to} with subject ${email.subject}`,
          additionalInfo: {
            error: errorDetails,
          },
        });

        throw error; // Re-throw the error after logging
      }
    },
  };
}
