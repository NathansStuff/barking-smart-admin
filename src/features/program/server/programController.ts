import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { getLastSegment } from '@/utils/getLastSegment';

import { Program } from '../types/Program';

import {
  createProgramService,
  deleteProgramService,
  getAllProgramsService,
  getProgramByIdService,
  updateProgramService,
} from './programService';

export async function createProgramHandler(
  req: NextRequest
): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = Program.parse(data);
  const program = await createProgramService(safeBody);
  return NextResponse.json({ program }, { status: ResponseCode.OK });
}

export async function getAllProgramsHandler(
  req: NextRequest
): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const title = searchParams.get('title') || undefined;

  const result = await getAllProgramsService({
    page,
    limit,
    filters: {
      title,
    },
  });

  return NextResponse.json(result, { status: ResponseCode.OK });
}

export async function getProgramByIdHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const program = await getProgramByIdService(id);
  if (!program) {
    return NextResponse.json(
      { error: 'Program not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }
  return NextResponse.json({ program }, { status: ResponseCode.OK });
}

export async function updateProgramHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const data = await req.json();
  const safeBody = Program.partial().parse(data);
  const program = await updateProgramService(id, safeBody);
  if (!program) {
    return NextResponse.json(
      { error: 'Program not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }
  return NextResponse.json({ program }, { status: ResponseCode.OK });
}

export async function deleteProgramHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const program = await deleteProgramService(id);
  if (!program) {
    return NextResponse.json(
      { error: 'Program not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }
  return NextResponse.json({ program }, { status: ResponseCode.OK });
}
