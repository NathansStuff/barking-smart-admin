import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';

export const RequiredProgram = z.object({
  tags: z.object({
    location: z.nativeEnum(ELocation).optional(),
    energyLevel: z.nativeEnum(EEnergyLevel).optional(),
    duration: z.nativeEnum(EDuration).optional(),
    challenge: z.nativeEnum(EChallenge).optional(),
    type: z.array(z.nativeEnum(EActivityType)).optional(),
    space: z.nativeEnum(ESpace).optional(),
  }),
  count: z.number().min(1),
});

export const RequiredProgramPartial = RequiredProgram.partial();

export type RequiredProgram = z.infer<typeof RequiredProgram>;
export type RequiredProgramWithId = WithId<RequiredProgram> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type RequiredProgramPartial = z.infer<typeof RequiredProgramPartial>;
