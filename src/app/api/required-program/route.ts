import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import {
    createRequiredProgramHandler,
    getRequiredProgramsHandler,
} from '@/features/requiredProgram/server/requiredProgramController';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createRequiredProgramHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getRequiredProgramsHandler());
}