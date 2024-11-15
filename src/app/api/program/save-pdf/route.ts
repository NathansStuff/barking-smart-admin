import { NextRequest, NextResponse } from 'next/server';

import { savePdfController } from '@/features/pdf/server/pdfController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => savePdfController(req));
}
