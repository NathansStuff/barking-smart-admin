import { NextResponse } from 'next/server';

import { ResponseCode } from '@/types/ResponseCode';

import { getDashboardStatsService } from './dashboardService';

export async function getDashboardStatsHandler(): Promise<NextResponse> {
  const dashboardStats = await getDashboardStatsService();
  return NextResponse.json(dashboardStats, { status: ResponseCode.OK });
}
