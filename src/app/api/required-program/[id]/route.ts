import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import {
  deleteRequiredProgramHandler,
  getRequiredProgramByIdHandler,
  updateRequiredProgramHandler,
} from '@/features/requiredProgram/server/requiredProgramController';

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateRequiredProgramHandler(req));
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getRequiredProgramByIdHandler(req));
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => deleteRequiredProgramHandler(req));
}