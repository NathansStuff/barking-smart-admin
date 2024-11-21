import { getTotalSales } from '@/features/sales/db/saleDal';
import { getTotalUsers } from '@/features/user/db/userDal';

import { lifetimeStats, performanceData, periodStats } from '../mocks/mockData';
import { DashboardStatsResponse } from '../types/Metrics';
export const getDashboardStatsService = async (): Promise<DashboardStatsResponse> => {
  const totalUsers = await getTotalUsers();
  const { totalSales, totalRevenue } = await getTotalSales();

  return {
    lifetimeStats: { ...lifetimeStats, totalUsers, totalProductsSold: totalSales, totalSalesRevenue: totalRevenue },
    periodStats,
    performanceData,
  };
};
