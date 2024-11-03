import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextResponse } from 'next/server';

import { countAllProgramsByTagsHandler } from '@/features/program/server/programController';

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => countAllProgramsByTagsHandler());
}
