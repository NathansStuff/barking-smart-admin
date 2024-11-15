import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { ProgramWithId } from '../types/Program';

type ResponseType = ProgramWithId;

export const useDeleteProgram = (): UseMutationResult<ResponseType, Error, string> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, string>({
    mutationFn: async (id) => {
      const response = await BaseApiClient.delete<ResponseType>(`/api/program/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
    onError: () => {},
  });

  return mutation;
};
