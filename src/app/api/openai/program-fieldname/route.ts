import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { generateProgramFieldHandler } from '@/features/openai/server/openaiController';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => generateProgramFieldHandler(req));
}
