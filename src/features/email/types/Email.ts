import { ObjectId } from 'mongodb';

import { EmailRecipient } from './EmailRecipient';
import { EmailTemplateParams } from './EmailTemplateParams';
import { EmailType } from './EmailType';

export interface Email {
  to: EmailRecipient[];
  emailType: EmailType;
  params: EmailTemplateParams[EmailType];
  userId: ObjectId | null;
  ipAddress: string | null;
  test?: boolean;
}
