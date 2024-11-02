import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { env } from '@/constants';
import { getRequest } from '@/lib/fetch';

import { ProgramWithId } from '../types/Program';

type ResponseType = { program: ProgramWithId };

export function useGetProgramById(
  id: string
): UseQueryResult<ResponseType, Error> {
  const query = useQuery({
    queryKey: ['program', id],
    queryFn: async () => {
      const response = await getRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program/${id}`,
      );
      return response.data;
    },
    enabled: !!id,
  });

  return query;
}
