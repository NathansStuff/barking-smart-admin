import { NextRequest, NextResponse } from 'next/server';

import { createEmailTemplateHandler, getAllEmailTemplatesHandler } from '@/features/email/server/emailController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createEmailTemplateHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getAllEmailTemplatesHandler());
}
