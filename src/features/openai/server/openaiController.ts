import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { generateProgramContent, generateProgramField } from './openaiService';

export async function generateProgramContentHandler(req: NextRequest): Promise<NextResponse> {
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

export async function generateProgramFieldHandler(req: NextRequest): Promise<NextResponse> {
  try {
    const data = await req.json();
    const { fieldName, context } = data;
    const content = await generateProgramField(fieldName, context);
    return NextResponse.json({ content }, { status: ResponseCode.OK });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to generate field content' },
      { status: ResponseCode.INTERNAL_SERVER_ERROR }
    );
  }
}
