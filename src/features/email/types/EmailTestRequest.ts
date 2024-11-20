import { z } from 'zod';

export const EmailTestRequest = z.object({
  templateId: z.string(),
  variables: z.record(z.string(), z.string()),
  toEmail: z.string().email(),
});

export type EmailTestRequest = z.infer<typeof EmailTestRequest>;
