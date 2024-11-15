import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { Program, ProgramWithId } from '../types/Program';

type RequestType = Program;
type ResponseType = ProgramWithId;

export const useCreateProgram = (): UseMutationResult<ResponseType, Error, RequestType> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await BaseApiClient.post<ResponseType>('/api/program', json);
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate all queries that start with 'programs'
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
    onError: () => {},
  });

  return mutation;
};
