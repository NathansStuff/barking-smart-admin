import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { countProgramsByTagsHandler } from '@/features/program/server/programController';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => countProgramsByTagsHandler(req));
}
