import { NextRequest, NextResponse } from 'next/server';

import { updateUserRoleHandler } from '@/features/user/server/userController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => updateUserRoleHandler(req));
}