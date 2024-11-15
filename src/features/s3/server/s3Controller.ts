import { NextRequest, NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { s3UploadFileService, s3UploadProfilePictureService } from './s3Service';

export async function s3UploadProfilePictureHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.formData();
  const file = data.get('file') as File | null;
  const id = req.nextUrl.pathname.split('/')[3];
  if (!file || !id) {
    return NextResponse.json({ error: 'No file or userId provided' }, { status: ResponseCode.BAD_REQUEST });
  }
  const result = await s3UploadProfilePictureService(file, id);

  return NextResponse.json(result, { status: ResponseCode.OK });
}

export async function s3UploadFileHandler(req: NextRequest): Promise<NextResponse> {
  const data = await req.formData();
  const file = data.get('file') as File | null;
  const filename = data.get('filename') as string | null;
  if (!file || !filename) {
    return NextResponse.json({ error: 'No file or filename' }, { status: ResponseCode.BAD_REQUEST });
  }
  const result = await s3UploadFileService(file, filename);

  return NextResponse.json(result, { status: ResponseCode.OK });
}
