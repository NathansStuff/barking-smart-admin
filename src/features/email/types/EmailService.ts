import { Email } from './Email';

export type EmailService = (email: Email) => Promise<unknown>;
