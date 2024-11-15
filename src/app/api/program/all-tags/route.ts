import { NextResponse } from 'next/server';

import { countAllProgramsByTagsHandler } from '@/features/program/server/programController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => countAllProgramsByTagsHandler());
}
