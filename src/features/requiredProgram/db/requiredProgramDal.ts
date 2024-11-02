import connectMongo from '@/lib/mongodb';

import {
  RequiredProgram,
  RequiredProgramPartial,
  RequiredProgramWithId,
} from '../types/RequiredProgram';

import { RequiredProgramModel } from './requiredProgramModel';

export async function createRequiredProgram(
  program: RequiredProgram
): Promise<RequiredProgramWithId> {
  await connectMongo();
  const result = await RequiredProgramModel.create(program);
  return result;
}

export async function getRequiredPrograms(): Promise<RequiredProgramWithId[]> {
  await connectMongo();
  const result = await RequiredProgramModel.find({});
  return result;
}

export async function getRequiredProgramById(
  id: string
): Promise<RequiredProgramWithId | null> {
  await connectMongo();
  const result = await RequiredProgramModel.findById(id);
  return result;
}

export async function updateRequiredProgram(
  id: string,
  program: RequiredProgramPartial
): Promise<RequiredProgramWithId | null> {
  await connectMongo();
  const result = await RequiredProgramModel.findByIdAndUpdate(id, program, {
    new: true,
  });
  return result;
}

export async function deleteRequiredProgram(
  id: string
): Promise<RequiredProgramWithId | null> {
  await connectMongo();
  const result = await RequiredProgramModel.findByIdAndDelete(id);
  return result;
}
