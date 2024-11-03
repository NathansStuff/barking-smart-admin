import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { Program } from '../types/Program';

type RequestType = Partial<Program>;
type ResponseType = { count: number };

export function useCountTags(
  tags: RequestType
): UseQueryResult<ResponseType, Error> {
  return useQuery({
    queryKey: ['tagCounts', tags],
    queryFn: async () => {
      const response = await postRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program/tag-count`,
        tags
      );
      return response.data;
    },
  });
}
