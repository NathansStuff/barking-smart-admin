import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { Program, ProgramWithId } from '../types/Program';

type RequestType = { id: string; data: Partial<Program> };
type ResponseType = ProgramWithId;

export const useUpdateProgram = (): UseMutationResult<ResponseType, Error, RequestType> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ id, data }) => {
      const response = await BaseApiClient.put<ResponseType>(`/api/program/${id}`, data);

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
