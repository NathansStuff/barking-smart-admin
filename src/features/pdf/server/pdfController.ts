import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { generatePdfService, savePdfService } from './pdfService';

export async function generatePdfController(req: NextRequest): Promise<NextResponse> {
  const { program, variation } = await req.json();
  const pdf = await generatePdfService(program, variation);

  const response = new NextResponse(pdf, {
    status: ResponseCode.OK,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=sample.pdf',
    },
  });
  return response;
}

export async function savePdfController(req: NextRequest): Promise<NextResponse> {
  const { program, variation } = await req.json();
  const s3Url = await savePdfService(program, variation);
  return NextResponse.json(s3Url);
}
