import { NextRequest, NextResponse } from 'next/server';

import {
  deleteProgramHandler,
  getProgramByIdHandler,
  updateProgramHandler,
} from '@/features/program/server/programController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';
export async function PUT(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateProgramHandler(req));
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getProgramByIdHandler(req));
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => deleteProgramHandler(req));
}
