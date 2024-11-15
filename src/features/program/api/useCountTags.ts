import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { Program } from '../types/Program';

type RequestType = Partial<Program>;
type ResponseType = { count: number };

export function useCountTags(tags: RequestType): UseQueryResult<ResponseType, Error> {
  return useQuery({
    queryKey: ['tagCounts', tags],
    queryFn: async () => {
      const response = await BaseApiClient.post<ResponseType>('/api/program/tag-count', tags);
      return response.data;
    },
  });
}
