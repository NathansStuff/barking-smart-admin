import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { getLastSegment } from '@/utils/getLastSegment';

import {
  RequiredProgram,
  RequiredProgramPartial,
} from '../types/RequiredProgram';

import {
  createRequiredProgramService,
  deleteRequiredProgramService,
  getRequiredProgramByIdService,
  getRequiredProgramsService,
  updateRequiredProgramService,
} from './requiredProgramService';

export async function createRequiredProgramHandler(
  req: NextRequest
): Promise<NextResponse> {
  const data = await req.json();
  const safeBody = RequiredProgram.parse(data);
  const program = await createRequiredProgramService(safeBody);
  return NextResponse.json({ program }, { status: ResponseCode.OK });
}

export async function getRequiredProgramsHandler(): Promise<NextResponse> {
  const programs = await getRequiredProgramsService();
  return NextResponse.json({ programs }, { status: ResponseCode.OK });
}

export async function getRequiredProgramByIdHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const program = await getRequiredProgramByIdService(id);

  if (!program) {
    return NextResponse.json(
      { error: 'Required Program not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }

  return NextResponse.json({ program }, { status: ResponseCode.OK });
}

export async function updateRequiredProgramHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const data = await req.json();
  const safeBody = RequiredProgramPartial.parse(data);

  const program = await updateRequiredProgramService(id, safeBody);

  if (!program) {
    return NextResponse.json(
      { error: 'Required Program not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }

  return NextResponse.json({ program }, { status: ResponseCode.OK });
}

export async function deleteRequiredProgramHandler(
  req: NextRequest
): Promise<NextResponse> {
  const id = getLastSegment(req.nextUrl.pathname);
  const program = await deleteRequiredProgramService(id);

  if (!program) {
    return NextResponse.json(
      { error: 'Required Program not found' },
      { status: ResponseCode.NOT_FOUND }
    );
  }

  return NextResponse.json({ program }, { status: ResponseCode.OK });
}
