import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { EEnergyLevel } from '../types/EEnergyLevel';
import { ProgramWithId } from '../types/Program';

interface GetProgramsParams {
  page?: number;
  limit?: number;
  filters?: {
    title?: string;
    location?: string;
    energyLevel?: EEnergyLevel | 'all';
    energyLevelMin?: number;
    energyLevelMax?: number;
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

export function useGetPrograms(params: GetProgramsParams = {}): UseQueryResult<GetProgramsResponse, Error> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.filters?.title) searchParams.append('title', params.filters.title);
  if (params.filters?.location && params.filters.location !== 'all')
    searchParams.append('location', params.filters.location);
  if (params.filters?.energyLevel && params.filters.energyLevel !== 'all')
    searchParams.append('energyLevel', params.filters.energyLevel.toString());
  if (params.filters?.energyLevelMin) searchParams.append('energyLevelMin', params.filters.energyLevelMin.toString());
  if (params.filters?.energyLevelMax) searchParams.append('energyLevelMax', params.filters.energyLevelMax.toString());
  if (params.filters?.duration && params.filters.duration !== 'all')
    searchParams.append('duration', params.filters.duration);
  if (params.filters?.challenge && params.filters.challenge !== 'all')
    searchParams.append('challenge', params.filters.challenge);
  if (params.filters?.space && params.filters.space !== 'all') searchParams.append('space', params.filters.space);
  if (params.filters?.type && params.filters.type !== 'all') searchParams.append('type', params.filters.type);
  if (params.filters?.approved !== undefined) searchParams.append('approved', params.filters.approved.toString());

  return useQuery({
    queryKey: ['programs', params],
    queryFn: async () => {
      const response = await BaseApiClient.get<GetProgramsResponse>(`/api/program?${searchParams.toString()}`);
      return response.data;
    },
  });
}
