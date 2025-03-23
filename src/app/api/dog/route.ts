import { NextRequest, NextResponse } from 'next/server';

import { createDogHandler, getDogsHandler } from '@/features/dog/server/dogController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createDogHandler(req));
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getDogsHandler(req));
}
