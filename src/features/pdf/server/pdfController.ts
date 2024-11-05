import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { generatePdfService } from './pdfService';

export async function generatePdfController(
  req: NextRequest
): Promise<NextResponse> {
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
