import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { generateProgramContent } from './openaiService';

export async function generateProgramContentHandler(
  req: NextRequest
): Promise<NextResponse> {
  try {
    const data = await req.json();
    const program = await generateProgramContent(data.prompt);
    return NextResponse.json({ program }, { status: ResponseCode.OK });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Failed to generate program content' },
      { status: ResponseCode.INTERNAL_SERVER_ERROR }
    );
  }
}
