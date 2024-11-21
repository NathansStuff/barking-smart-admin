import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { LogWithUserDetails } from '@/features/log/types/Log';

interface GetLogsParams {
  page?: number;
  limit?: number;
  filters?: {
    email?: string;
    action?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  };
}

interface GetLogsResponse {
  logs: LogWithUserDetails[];
  total: number;
  page: number;
  totalPages: number;
}

async function getLogs(params: GetLogsParams = {}): Promise<GetLogsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.filters?.email) searchParams.append('email', params.filters.email);
  if (params.filters?.action) searchParams.append('action', params.filters.action);
  if (params.filters?.status) searchParams.append('status', params.filters.status);
  if (params.filters?.startDate) searchParams.append('startDate', params.filters.startDate);
  if (params.filters?.endDate) searchParams.append('endDate', params.filters.endDate);

  const response = await BaseApiClient.get<GetLogsResponse>(`/api/log?${searchParams.toString()}`);
  return response.data;
}

export function useGetLogs(params: GetLogsParams = {}): UseQueryResult<GetLogsResponse> {
  return useQuery({
    queryKey: ['logs', params],
    queryFn: () => getLogs(params),
  });
}
