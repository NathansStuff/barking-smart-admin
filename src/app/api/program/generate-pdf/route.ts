import { NextRequest, NextResponse } from 'next/server';

import { generatePdfController } from '@/features/pdf/server/pdfController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => generatePdfController(req));
}
