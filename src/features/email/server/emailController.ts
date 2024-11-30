import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';
import { getIpAddress } from '@/utils/getIpAddress';
import { getLastSegment } from '@/utils/getLastSegment';

import { EmailTemplate, EmailTemplatePartial } from '../types/EmailTemplate';
import { EmailTestRequest } from '../types/EmailTestRequest';

import {
  createEmailTemplateService,
  deleteEmailTemplateService,
  getAllEmailTemplatesService,
  getEmailTemplateByIdService,
  sendTestEmail,
  updateEmailTemplateService,
} from './emailService';

export async function sendTestEmailHandler(req: NextRequest): Promise<NextResponse> {
  console.log('sendTestEmailHandler');
  const data = await req.json();
  const safeBody = EmailTestRequest.parse(data);
  const ipAddress = getIpAddress(req);
  await sendTestEmail(safeBody.templateId, safeBody.variables, safeBody.toEmail, ipAddress);

  return NextResponse.json({ status: ResponseCode.OK });
}

export async function getAllEmailTemplatesHandler(): Promise<NextResponse> {
  const emailTemplates = await getAllEmailTemplatesService();
  return NextResponse.json(emailTemplates);
}

export async function createEmailTemplateHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = EmailTemplate.parse(data);
  const emailTemplate = await createEmailTemplateService(safeBody);
  return NextResponse.json({ emailTemplate });
}

export async function getEmailTemplateByIdHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const emailTemplate = await getEmailTemplateByIdService(id);
  return NextResponse.json(emailTemplate);
}

export async function updateEmailTemplateHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const data = await req.json();
  const safeBody = EmailTemplatePartial.parse(data);
  const emailTemplate = await updateEmailTemplateService(id, safeBody);
  return NextResponse.json({ emailTemplate });
}

export async function deleteEmailTemplateHandler(req: NextRequest): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  await deleteEmailTemplateService(id);
  return NextResponse.json({ status: ResponseCode.OK });
}
