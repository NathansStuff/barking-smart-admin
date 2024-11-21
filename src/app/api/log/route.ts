import { NextRequest, NextResponse } from 'next/server';

import { createLogHandler, getAllLogsHandler } from '@/features/log/server/logController';
import { ResponseCode } from '@/types/ResponseCode';

export async function POST(req: NextRequest): Promise<NextResponse> {
  return createLogHandler(req);
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  return getAllLogsHandler(req);
}

export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, { status: ResponseCode.OK });
}
