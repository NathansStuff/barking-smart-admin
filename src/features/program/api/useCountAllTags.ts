import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

type ResponseType = { key: string; count: number }[];

export function useCountAllTags(): UseQueryResult<ResponseType, Error> {
  return useQuery({
    queryKey: ['allTagCounts'],
    queryFn: async () => {
      const response = await BaseApiClient.get<ResponseType>('/api/program/all-tags');
      return response.data;
    },
  });
}
