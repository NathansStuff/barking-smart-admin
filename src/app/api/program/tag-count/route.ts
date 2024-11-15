import { NextRequest, NextResponse } from 'next/server';

import { countProgramsByTagsHandler } from '@/features/program/server/programController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => countProgramsByTagsHandler(req));
}
