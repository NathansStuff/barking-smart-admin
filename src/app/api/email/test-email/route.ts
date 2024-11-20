import { NextRequest, NextResponse } from 'next/server';

import { sendTestEmailHandler } from '@/features/email/server/emailController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => sendTestEmailHandler(req));
}
