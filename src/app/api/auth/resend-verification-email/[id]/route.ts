import { NextRequest, NextResponse } from 'next/server';

import { resendVerificationEmailHandler } from '@/features/user/server/userController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => resendVerificationEmailHandler(req));
}
