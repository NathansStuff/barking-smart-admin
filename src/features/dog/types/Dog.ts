import { ObjectId, WithId } from 'mongodb';
import { z } from 'zod';

import { ELocation } from '@/features/program/types/ELocation';

import { EBreed } from './EBreed';
import { EGender } from './EGender';
import { EHealthIssues } from './EHealthIssues';

export const Dog = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  purebred: z.boolean(),
  breedOne: z.nativeEnum(EBreed),
  breedTwo: z.nativeEnum(EBreed).optional(),
  gender: z.nativeEnum(EGender),
  // photoGallery: z.array(z.string().url()),
  profileUrl: z.string().url().optional(),
  bio: z.string().optional(),
  desexed: z.boolean(),
  // vaccinated: z.boolean(),
  // microchipped: z.boolean(),
  // microchipNumber: z.string().optional(),
  healthIssues: z.array(z.nativeEnum(EHealthIssues)),
  howActive: z.number().min(1).max(10),
  weight: z.number().optional(),
  foodOrientated: z.boolean(),
  location: z.nativeEnum(ELocation),
});

export const DogPartial = Dog.partial();

export type Dog = z.infer<typeof Dog>;
export type DogWithId = WithId<Dog> & {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};
export type DogPartial = z.infer<typeof DogPartial>;
