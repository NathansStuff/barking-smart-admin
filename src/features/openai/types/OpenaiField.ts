import { z } from 'zod';

export const FieldGenerationSchema = z.object({
  content: z.string(),
});

export type FieldGenerationResponse = z.infer<typeof FieldGenerationSchema>;
