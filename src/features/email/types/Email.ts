import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import { EEmailTrigger } from './EEmailTrigger';
import { EEmailType } from './EEmailType';

// Define the Log schema
export const EmailTemplate = z.object({
  name: z.string(),
  trigger: z.nativeEnum(EEmailTrigger),
  subject: z.string(),
  heroSection: z.string(),
  body: z.string(),
  type: z.nativeEnum(EEmailType),
});

// Partial Log schema for optional fields
export const EmailTemplatePartial = EmailTemplate.partial();

export type EmailTemplate = z.infer<typeof EmailTemplate>;
export type EmailTemplateWithId = WithId<EmailTemplate> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type EmailTemplatePartial = z.infer<typeof EmailTemplatePartial>;
