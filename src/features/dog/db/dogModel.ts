import { model, models } from 'mongoose';

import { Dog } from '../types/Dog';

import { dogSchema } from './dogSchema';

export const DogModel = models.Dog || model<Dog>('Dog', dogSchema);
