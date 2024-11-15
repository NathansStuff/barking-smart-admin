import { connectMongo } from '@/features/database/lib/mongodb';

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
export async function getProgramById(id: string): Promise<ProgramWithId | null> {
  await connectMongo();
  const result = await ProgramModel.findById(id);
  return result;
}

// Update Program
export async function updateProgram(id: string, program: Partial<Program>): Promise<ProgramWithId | null> {
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

// Get Programs Count by tags
export async function getProgramsByTags(tags: Partial<Program>): Promise<number> {
  await connectMongo();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {};
  if (tags.tags) {
    Object.entries(tags.tags).forEach(([key, value]) => {
      query[`tags.${key}`] = key === 'type' ? { $in: value } : value;
    });
  }

  const result = await ProgramModel.countDocuments(query);
  return result;
}
