import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { ProgramWithId } from '../types/Program';

type ResponseType = { program: ProgramWithId };

export function useGetProgramById(id: string): UseQueryResult<ResponseType, Error> {
  const query = useQuery({
    queryKey: ['program', id],
    queryFn: async () => {
      const response = await BaseApiClient.get<ResponseType>(`/api/program/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  return query;
}
