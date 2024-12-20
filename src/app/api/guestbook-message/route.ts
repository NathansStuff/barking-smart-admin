import { NextRequest, NextResponse } from 'next/server';

import {
  createGuestbookMessageHandler,
  getAllGuestbookMessagesHandler,
} from '@/features/guestbook/server/guestbookMessageController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';
export async function POST(req: NextRequest): Promise<NextResponse> {
  return await TryCatchMiddleware(() => createGuestbookMessageHandler(req));
}

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getAllGuestbookMessagesHandler());
}
