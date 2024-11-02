import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { UserWithId } from '../types/User';

async function getUser(id: string): Promise<UserWithId> {
  const response = await BaseApiClient.get<UserWithId>(`/api/user/${id}`);
  return response.data;
}

export function useGetUser(id: string): UseQueryResult<UserWithId, Error> {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
}