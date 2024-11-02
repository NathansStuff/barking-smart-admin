import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { s3UploadFileHandler } from '@/features/s3/server/s3Controller';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => s3UploadFileHandler(req));
}
