import { NextRequest, NextResponse } from 'next/server';

import { generateProgramContentHandler } from '@/features/openai/server/openaiController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => generateProgramContentHandler(req));
}
