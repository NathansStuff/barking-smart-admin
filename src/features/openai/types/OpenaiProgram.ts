import { z } from 'zod';

import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';

export const OpenaiProgramSchema = z.object({
  title: z.string(),
  description: z.string(),
  materialsNeeded: z.string(),
  setup: z.string(),
  instructions: z.string(),
  additionalTips: z.string(),
  tags: z.object({
    location: z.nativeEnum(ELocation),
    energyLevel: z.number(),
    duration: z.nativeEnum(EDuration),
    challenge: z.nativeEnum(EChallenge),
    type: z.array(z.nativeEnum(EActivityType)),
    space: z.nativeEnum(ESpace),
  }),
});

export type OpenaiProgram = z.infer<typeof OpenaiProgramSchema>;
