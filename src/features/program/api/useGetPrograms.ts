import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

import { ProgramWithId } from '../types/Program';

interface GetProgramsParams {
  page?: number;
  limit?: number;
  filters?: {
    title?: string;
    location?: string;
    duration?: string;
    challenge?: string;
    space?: string;
    type?: string;
    approved?: boolean;
  };
}

interface GetProgramsResponse {
  programs: ProgramWithId[];
  total: number;
  page: number;
  totalPages: number;
}

export function useGetPrograms(
  params: GetProgramsParams = {}
): UseQueryResult<GetProgramsResponse, Error> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.filters?.title) searchParams.append('title', params.filters.title);
  if (params.filters?.approved !== undefined) searchParams.append('approved', params.filters.approved.toString());

  return useQuery({
    queryKey: ['programs', params],
    queryFn: async () => {
      const response = await getRequest<GetProgramsResponse>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program?${searchParams.toString()}`
      );
      return response.data;
    },
  });
}
