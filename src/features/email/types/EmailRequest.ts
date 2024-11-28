import { ObjectId } from 'mongodb';

export interface EmailRequest {
  to: string;
  subject: string;
  body: string;
  userId: ObjectId | null;
  ipAddress: string | null;
  test?: boolean;
}
