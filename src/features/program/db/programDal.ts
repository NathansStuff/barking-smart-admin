import connectMongo from '@/lib/mongodb';

import { Program, ProgramWithId } from '../types/Program';

import { ProgramModel } from './programModel';

// ***** Basic CRUD *****
// Create a Program
export async function createProgram(program: Program): Promise<ProgramWithId> {
  await connectMongo();
  const result = await ProgramModel.create(program);
  return result;
}

// Get all Programs
export async function getAllPrograms(): Promise<ProgramWithId[]> {
  await connectMongo();
  const result = await ProgramModel.find({});
  return result;
}

// Get Program by ID
export async function getProgramById(
  id: string,
): Promise<ProgramWithId | null> {
  await connectMongo();
  const result = await ProgramModel.findById(id);
  return result;
}

// Update Program
export async function updateProgram(
  id: string,
  program: Partial<Program>,
): Promise<ProgramWithId | null> {
  await connectMongo();
  const result = await ProgramModel.findByIdAndUpdate(id, program, {
    new: true,
  });
  return result;
}

// Delete Program
export async function deleteProgram(id: string): Promise<ProgramWithId | null> {
  await connectMongo();
  const result = await ProgramModel.findByIdAndDelete(id);
  return result;
}
