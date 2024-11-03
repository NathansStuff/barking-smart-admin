import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

type ResponseType = { key: string; count: number }[];

export function useCountAllTags(): UseQueryResult<ResponseType, Error> {
  return useQuery({
    queryKey: ['allTagCounts'],
    queryFn: async () => {
      const response = await getRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program/all-tags`
      );
      return response.data;
    },
  });
}
