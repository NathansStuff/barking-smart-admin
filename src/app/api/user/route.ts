import { NextRequest, NextResponse } from 'next/server';

import { createUserHandler, getUsersHandler } from '@/features/user/server/userController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createUserHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getUsersHandler());
}
