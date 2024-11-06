import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { ELocation } from '@/features/program/types/ELocation';
import { BaseApiClient } from '@/lib/BaseApiClient';

import { DogWithId } from '../types/Dog';
import { EBreed } from '../types/EBreed';

interface GetDogsParams {
  page?: number;
  limit?: number;
  filters?: {
    name?: string;
    breed?: EBreed;
    location?: ELocation;
  };
}

interface GetDogsResponse {
  dogs: DogWithId[];
  total: number;
  page: number;
  totalPages: number;
}

async function getDogs(params: GetDogsParams = {}): Promise<GetDogsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append('page', params.page.toString());
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.filters?.name) searchParams.append('name', params.filters.name);
  if (params.filters?.breed) searchParams.append('breed', params.filters.breed);
  if (params.filters?.location) searchParams.append('location', params.filters.location);

  const response = await BaseApiClient.get<GetDogsResponse>(
    `/api/dog?${searchParams.toString()}`
  );
  return response.data;
}

export function useGetDogs(
  params: GetDogsParams = {}
): UseQueryResult<GetDogsResponse> {
  return useQuery({
    queryKey: ['dogs', params],
    queryFn: () => getDogs(params),
  });
}