import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { generateProgramContentHandler } from '@/features/openai/server/openaiController';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => generateProgramContentHandler(req));
}
