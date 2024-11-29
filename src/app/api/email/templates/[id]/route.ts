import { NextRequest, NextResponse } from 'next/server';

import {
  deleteEmailTemplateHandler,
  getEmailTemplateByIdHandler,
  updateEmailTemplateHandler,
} from '@/features/email/server/emailController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getEmailTemplateByIdHandler(req));
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateEmailTemplateHandler(req));
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => deleteEmailTemplateHandler(req));
}
