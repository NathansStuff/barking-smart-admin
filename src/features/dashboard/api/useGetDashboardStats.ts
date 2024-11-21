import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { DashboardStatsResponse } from '../types/Metrics';

export const getDashboardStats = async (): Promise<DashboardStatsResponse> => {
  const res = await BaseApiClient.get<DashboardStatsResponse>('/api/stats/dashboard');

  return res.data;
};

export const useGetDashboardStats = (): UseQueryResult<DashboardStatsResponse> => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => getDashboardStats(),
  });
};
