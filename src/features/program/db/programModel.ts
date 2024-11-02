import { model, models } from 'mongoose';

import { Program } from '../types/Program';

import { programSchema } from './programSchema';

export const ProgramModel =
  models.Program || model<Program>('Program', programSchema);
