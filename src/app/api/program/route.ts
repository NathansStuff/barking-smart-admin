import { NextRequest, NextResponse } from 'next/server';

import { createProgramHandler, getAllProgramsHandler } from '@/features/program/server/programController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createProgramHandler(req));
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getAllProgramsHandler(req));
}
