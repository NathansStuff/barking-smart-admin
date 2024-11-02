import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { EUserRole } from '../types/EUserRole';
import { UserWithId } from '../types/User';

interface GetUsersParams {
  page?: number;
  limit?: number;
  filters?: {
    name?: string;
    email?: string;
    role?: EUserRole;
  };
}

interface GetUsersResponse {
  users: UserWithId[];
  total: number;
  page: number;
  totalPages: number;
}

async function getUsers(
  params: GetUsersParams = {}
): Promise<GetUsersResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.filters?.name) searchParams.append('name', params.filters.name);
  if (params.filters?.email) searchParams.append('email', params.filters.email);
  if (params.filters?.role) searchParams.append('role', params.filters.role);

  const response = await BaseApiClient.get<GetUsersResponse>(
    `/api/user?${searchParams.toString()}`
  );
  return response.data;
}

export function useGetUsers(
  params: GetUsersParams = {}
): UseQueryResult<GetUsersResponse> {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
  });
}
