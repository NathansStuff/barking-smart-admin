import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { RequiredProgramWithId } from '../types/RequiredProgram';

interface GetRequiredProgramsParams {
  page?: number;
  limit?: number;
}

interface GetRequiredProgramsResponse {
  programs: RequiredProgramWithId[];
  total: number;
  page: number;
  totalPages: number;
}

async function getRequiredPrograms(
  params: GetRequiredProgramsParams = {}
): Promise<GetRequiredProgramsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());

  const response = await BaseApiClient.get<GetRequiredProgramsResponse>(
    `/api/required-program?${searchParams.toString()}`
  );
  return response.data;
}

export function useGetRequiredPrograms(
  params: GetRequiredProgramsParams = {}
): UseQueryResult<GetRequiredProgramsResponse, Error> {
  return useQuery({
    queryKey: ['required-programs', params],
    queryFn: () => getRequiredPrograms(params),
  });
}