import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { env } from '@/constants';
import { deleteRequest } from '@/lib/fetch';

import { ProgramWithId } from '../types/Program';

type ResponseType = ProgramWithId;

export const useDeleteProgram = (): UseMutationResult<
  ResponseType,
  Error,
  string
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, string>({
    mutationFn: async id => {
      const response = await deleteRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program/${id}`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
    onError: () => {},
  });

  return mutation;
};
