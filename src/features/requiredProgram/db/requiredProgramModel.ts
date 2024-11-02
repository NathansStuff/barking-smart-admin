import { model, models } from 'mongoose';

import { requiredProgramSchema } from './requiredProgramSchema';

export const RequiredProgramModel =
  models.RequiredProgram || model('RequiredProgram', requiredProgramSchema);
