import { NextRequest, NextResponse } from 'next/server';

import { CreateLogResponse } from '@/features/log/types/CreateLogResponse';
import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddress } from '@/utils/getIpAddress';

import { CreateLogRequest } from '../types/CreateLogRequest';

import { createLogService, getAllLogsService } from './logService';

// Handler to create a new Log
export async function createLogHandler(req: NextRequest): Promise<NextResponse<CreateLogResponse>> {
  const data = await req.json();
  const safeBody = CreateLogRequest.parse(data);
  const ipAddress = getIpAddress(req);
  await createLogService(safeBody, ipAddress);
  return NextResponse.json({ isValid: true }, { status: ResponseCode.OK });
}

// Handler to get all logs with pagination and filters
export async function getAllLogsHandler(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = req.nextUrl;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const email = searchParams.get('email') || undefined;
  const action = searchParams.get('action') || undefined;
  const status = searchParams.get('status') || undefined;
  const startDate = searchParams.get('startDate') || undefined;
  const endDate = searchParams.get('endDate') || undefined;

  const logs = await getAllLogsService({
    page,
    limit,
    filters: {
      email,
      action,
      status,
      startDate,
      endDate,
    },
  });
  return NextResponse.json(logs, { status: ResponseCode.OK });
}
