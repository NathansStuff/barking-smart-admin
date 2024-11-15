import { NextRequest, NextResponse } from 'next/server';

import { s3UploadProfilePictureHandler } from '@/features/s3/server/s3Controller';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => s3UploadProfilePictureHandler(req));
}
