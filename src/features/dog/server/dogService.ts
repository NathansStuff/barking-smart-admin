import connectMongo from '@/features/database/lib/mongodb';
import { createDog, deleteDogById, getDogById } from '@/features/dog/db/dogDal';
import { Dog, DogPartial, DogWithId } from '@/features/dog/types/Dog';

import { DogModel } from '../db/dogModel';

// Service to create a dog
export async function createDogService(dog: Dog): Promise<DogWithId> {
  const newDog = await createDog(dog);
  return newDog;
}

// Service to get all dogs with pagination and filters
interface GetDogsOptions {
  page?: number;
  limit?: number;
  filters?: {
    name?: string;
    breed?: string;
    location?: string;
  };
}

export async function getAllDogsService(options: GetDogsOptions = {}): Promise<{
  dogs: DogWithId[];
  total: number;
  page: number;
  totalPages: number;
}> {
  await connectMongo();

  const page = options.page || 1;
  const limit = options.limit || 10;
  const skip = (page - 1) * limit;

  // Build filter query

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {};
  if (options.filters?.name) {
    filter.name = { $regex: options.filters.name, $options: 'i' };
  }
  if (options.filters?.breed) {
    filter.$or = [{ breedOne: options.filters.breed }, { breedTwo: options.filters.breed }];
  }
  if (options.filters?.location) {
    filter.location = options.filters.location;
  }

  // Get total count for pagination
  const total = await DogModel.countDocuments(filter);

  // Get paginated results
  const dogs = await DogModel.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });

  return {
    dogs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}

// Service to get a dog by ID
export async function getDogByIdService(id: string): Promise<DogWithId | null> {
  return await getDogById(id);
}

// Service to update a dog by ID
export async function updateDogByIdService(id: string, dog: DogPartial): Promise<DogWithId | null> {
  const existingDog = await getDogById(id);
  if (!existingDog) {
    return null;
  }

  await connectMongo();
  const updatedDog = await DogModel.findByIdAndUpdate(id, dog, { new: true });
  return updatedDog;
}

// Service to delete a dog by ID
export async function deleteDogByIdService(id: string): Promise<void> {
  return await deleteDogById(id);
}
