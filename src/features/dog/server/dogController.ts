import { NextRequest, NextResponse } from 'next/server';

import { Dog, DogPartial } from '@/features/dog/types/Dog';
import { ResponseCode } from '@/types/ResponseCode';
import { getLastSegment } from '@/utils/getLastSegment';

import {
  createDogService,
  deleteDogByIdService,
  getAllDogsService,
  getDogByIdService,
  updateDogByIdService,
} from './dogService';

// Handler to create a new dog
export async function createDogHandler(
  req: NextRequest
): Promise<NextResponse> {
  const data = await req.json();
  const dateOfBirth = new Date(data.dateOfBirth);
  const safeBody = Dog.parse({ ...data, dateOfBirth });
  const result = await createDogService(safeBody);
  return NextResponse.json(result, { status: ResponseCode.CREATED });
}

// Handler to get all dogs with pagination and filters
export async function getDogsHandler(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const name = searchParams.get('name') || undefined;
  const breed = searchParams.get('breed') || undefined;
  const location = searchParams.get('location') || undefined;

  const dogs = await getAllDogsService({
    page,
    limit,
    filters: {
      name,
      breed,
      location,
    },
  });
  return NextResponse.json(dogs, { status: ResponseCode.OK });
}

// Handler to get a dog by ID
export async function getDogHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const dog = await getDogByIdService(id);
  if (!dog) {
    return NextResponse.json(
      { message: 'Dog not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }
  return NextResponse.json(dog, { status: ResponseCode.OK });
}

// Handler to update a dog by ID
export async function updateDogHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const data = await req.json();
  const dateOfBirth = new Date(data.dateOfBirth);
  const safeBody = DogPartial.parse({ ...data, dateOfBirth });
  const updatedDog = await updateDogByIdService(id, safeBody);
  if (!updatedDog) {
    return NextResponse.json(
      { message: 'Dog not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }
  return NextResponse.json(updatedDog, { status: ResponseCode.OK });
}

// Handler to delete a dog by ID
export async function deleteDogHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  await deleteDogByIdService(id);
  return NextResponse.json(
    { message: 'Dog deleted successfully' },
    { status: ResponseCode.OK }
  );
}
