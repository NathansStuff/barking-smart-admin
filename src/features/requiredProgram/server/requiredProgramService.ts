import { z } from 'zod';

import {
    createRequiredProgram,
    deleteRequiredProgram,
    getRequiredProgramById,
    getRequiredPrograms,
    updateRequiredProgram,
} from '../db/requiredProgramDal';
import {
    RequiredProgram,
    RequiredProgramPartial,
    RequiredProgramWithId,
} from '../types/RequiredProgram';

type RequiredProgramType = z.infer<typeof RequiredProgram>;

export async function createRequiredProgramService(
  program: RequiredProgramType
): Promise<RequiredProgramType> {
  const valid = RequiredProgram.parse(program);
  console.log('valid', valid);
  return await createRequiredProgram(valid);
}

export async function getRequiredProgramsService(): Promise<
  RequiredProgramType[]
> {
  return await getRequiredPrograms();
}

export async function getRequiredProgramByIdService(
  id: string
): Promise<RequiredProgramType | null> {
  return await getRequiredProgramById(id);
}

export async function updateRequiredProgramService(
  id: string,
  program: RequiredProgramPartial
): Promise<RequiredProgramType | null> {
  const valid = RequiredProgramPartial.parse(program);
  return await updateRequiredProgram(id, valid);
}

export async function deleteRequiredProgramService(
  id: string
): Promise<RequiredProgramWithId | null> {
  return await deleteRequiredProgram(id);
}
