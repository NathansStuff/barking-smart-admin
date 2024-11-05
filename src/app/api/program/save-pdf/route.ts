import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { savePdfController } from '@/features/pdf/server/pdfController';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => savePdfController(req));
}
