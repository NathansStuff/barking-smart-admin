import { ResponseCode } from '@operation-firefly/error-handling';
import { NextRequest, NextResponse } from 'next/server';

import { getLastSegment } from '@/utils/getLastSegment';

import { Program, ProgramPartial } from '../types/Program';

import {
  countAllProgramsByTagsService,
  countProgramsByTagsService,
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
  return NextResponse.json(program, { status: ResponseCode.OK });
}

export async function getAllProgramsHandler(
  req: NextRequest
): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const filters = {
    title: searchParams.get('title') || undefined,
    location: searchParams.get('location') || undefined,
    energyLevel: searchParams.get('energyLevel') || undefined,
    duration: searchParams.get('duration') || undefined,
    challenge: searchParams.get('challenge') || undefined,
    space: searchParams.get('space') || undefined,
    type: searchParams.get('type') || undefined,
    approved: searchParams.has('approved')
      ? searchParams.get('approved') === 'true'
      : undefined,
    energyLevelMin: parseInt(searchParams.get('energyLevelMin') || '0'),
    energyLevelMax: parseInt(searchParams.get('energyLevelMax') || '0'),
  };

  const result = await getAllProgramsService({
    page,
    limit,
    filters,
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

export async function countProgramsByTagsHandler(
  req: NextRequest
): Promise<NextResponse> {
  const data = await req.json();
  const tags = ProgramPartial.parse(data);
  const count = await countProgramsByTagsService(tags);
  return NextResponse.json({ count }, { status: ResponseCode.OK });
}

export async function countAllProgramsByTagsHandler(): Promise<NextResponse> {
  const counts = await countAllProgramsByTagsService();
  return NextResponse.json(counts, { status: ResponseCode.OK });
}
