import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { UserWithId } from '../types/User';

export function useGetUsers(): UseQueryResult<UserWithId[], Error> {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await BaseApiClient.get<UserWithId[]>('/api/user');
      return response.data;
    },
  });
}