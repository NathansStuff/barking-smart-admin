import {
  createProgram,
  deleteProgram,
  getProgramById,
  updateProgram,
} from '../db/programDal';
import { ProgramModel } from '../db/programModel';
import { Program, ProgramWithId } from '../types/Program';

export async function createProgramService(
  program: Program,
): Promise<ProgramWithId> {
  const valid = Program.parse(program);
  console.log('valid', valid);
  return await createProgram(valid);
}

interface GetProgramsOptions {
  page?: number;
  limit?: number;
  filters?: {
    title?: string;
    location?: string;
    duration?: string;
    challenge?: string;
    space?: string;
    type?: string;
  };
}

export async function getAllProgramsService(
  options: GetProgramsOptions = {}
): Promise<{
  programs: ProgramWithId[];
  total: number;
  page: number;
  totalPages: number;
}> {
  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Build filter query
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};
  if (options.filters?.title) {
    filter.title = { $regex: options.filters.title, $options: 'i' };
  }
  if (options.filters?.location) {
    filter['tags.location'] = options.filters.location;
  }
  if (options.filters?.duration) {
    filter['tags.duration'] = options.filters.duration;
  }
  if (options.filters?.challenge) {
    filter['tags.challenge'] = options.filters.challenge;
  }
  if (options.filters?.space) {
    filter['tags.space'] = options.filters.space;
  }
  if (options.filters?.type) {
    filter['tags.type'] = options.filters.type;
  }

  const total = await ProgramModel.countDocuments(filter);
  const programs = await ProgramModel.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return {
    programs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProgramByIdService(
  id: string,
): Promise<ProgramWithId | null> {
  return await getProgramById(id);
}

export async function updateProgramService(
  id: string,
  program: Partial<Program>,
): Promise<ProgramWithId | null> {
  const valid = Program.partial().parse(program);
  return await updateProgram(id, valid);
}

export async function deleteProgramService(
  id: string,
): Promise<ProgramWithId | null> {
  return await deleteProgram(id);
}
