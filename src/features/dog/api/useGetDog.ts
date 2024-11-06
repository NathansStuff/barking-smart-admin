import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { DogWithId } from '../types/Dog';

async function getDog(id: string): Promise<DogWithId> {
  const response = await BaseApiClient.get<DogWithId>(`/api/dog/${id}`);
  return response.data;
}

export function useGetDog(id: string): UseQueryResult<DogWithId, Error> {
  return useQuery({
    queryKey: ['dog', id],
    queryFn: () => getDog(id),
    enabled: !!id,
  });
}