import connectMongo from '@/features/database/lib/mongodb';

import { Dog, DogPartial, DogWithId } from '../types/Dog';

import { DogModel } from './dogModel';

// Create a Dog
export async function createDog(dog: Dog): Promise<DogWithId> {
  await connectMongo();
  const result = await DogModel.create(dog);
  return result;
}

// Get a Dog by ID
export async function getDogById(id: string): Promise<DogWithId> {
  await connectMongo();
  const result = await DogModel.findById(id);
  return result;
}

// Get all Dogs
export async function getAllDogs(): Promise<DogWithId[]> {
  await connectMongo();
  const result = await DogModel.find({});
  return result;
}

// Update a Dog
export async function updateDogById(id: string, dog: DogPartial): Promise<DogWithId> {
  await connectMongo();
  const result = await DogModel.findByIdAndUpdate(id, dog, { new: true });
  return result;
}

// Delete a Dog
export async function deleteDogById(id: string): Promise<void> {
  await connectMongo();
  await DogModel.findByIdAndDelete(id);
}
