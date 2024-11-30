import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddress } from '@/utils/getIpAddress';

import { EmailTestRequest } from '../types/EmailTestRequest';

import { sendTestEmail } from './emailService';

export async function sendTestEmailHandler(req: NextRequest): Promise<NextResponse> {
  console.log('sendTestEmailHandler');
  const data = await req.json();
  const safeBody = EmailTestRequest.parse(data);
  const ipAddress = getIpAddress(req);
  await sendTestEmail(safeBody.templateId, safeBody.variables, safeBody.toEmail, ipAddress);

  return NextResponse.json({ status: ResponseCode.OK });
}
