import { EmailRequest } from './EmailRequest';

export interface EmailService {
  sendEmail({ to, subject, body }: EmailRequest): Promise<void>;
}
