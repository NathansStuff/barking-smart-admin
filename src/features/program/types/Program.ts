import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import { EActivityType } from './EActivityType';
import { EChallenge } from './EChallenge';
import { EDuration } from './EDuration';
import { ELocation } from './ELocation';
import { ESpace } from './ESpace';

export const Program = z.object({
  title: z.string(),
  description: z.string(),
  materialsNeeded: z.string(),
  setup: z.string(),
  instructions: z.string(),
  additionalTips: z.string(),
  canvaLink: z.string().url().optional(),
  canvaUpToDate: z.boolean().default(false),
  pdfLink: z.string().url().optional(),
  pdfUpToDate: z.boolean().default(false),
  approved: z.boolean().default(false),
  tags: z.object({
    location: z.nativeEnum(ELocation),
    energyLevel: z.number().min(1).max(10),
    duration: z.nativeEnum(EDuration),
    challenge: z.nativeEnum(EChallenge),
    type: z.array(z.nativeEnum(EActivityType)),
    space: z.nativeEnum(ESpace),
  }),
});

export const ProgramPartial = Program.partial();

export type Program = z.infer<typeof Program>;
export type ProgramWithId = WithId<Program> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type ProgramPartial = z.infer<typeof Program>;
