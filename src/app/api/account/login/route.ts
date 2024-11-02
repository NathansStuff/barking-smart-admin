import { TryCatchMiddleware } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { accountLoginHandler } from '@/features/account/server/accountController';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => accountLoginHandler(req));
}
