import { NextRequest, NextResponse } from 'next/server';

import { generateProgramFieldHandler } from '@/features/openai/server/openaiController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => generateProgramFieldHandler(req));
}
