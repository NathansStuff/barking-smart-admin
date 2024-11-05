import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { env } from '@/constants';
import { putRequest } from '@/lib/fetch';

import { Program, ProgramWithId } from '../types/Program';

type RequestType = { id: string; data: Partial<Program> };
type ResponseType = ProgramWithId;

export const useUpdateProgram = (): UseMutationResult<
  ResponseType,
  Error,
  RequestType
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, data }) => {
      const response = await putRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program/${id}`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
      queryClient.invalidateQueries({ queryKey: ['program', variables.id] });
    },
    onError: () => {},
  });

  return mutation;
};
