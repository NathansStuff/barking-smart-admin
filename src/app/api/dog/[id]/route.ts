import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import {
  deleteDogHandler,
  getDogHandler,
  updateDogHandler,
} from '@/features/dog/server/dogController';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getDogHandler(req));
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateDogHandler(req));
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => deleteDogHandler(req));
}
