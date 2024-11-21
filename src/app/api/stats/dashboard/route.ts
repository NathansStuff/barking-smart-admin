import { NextResponse } from 'next/server';

import { getDashboardStatsHandler } from '@/features/dashboard/server/dashboardController';
import { TryCatchMiddleware } from '@/middleware/tryCatchMiddleware';

export async function GET(): Promise<NextResponse> {
  return await TryCatchMiddleware(() => getDashboardStatsHandler());
}
