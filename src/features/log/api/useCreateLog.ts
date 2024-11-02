import { useMutation, useQueryClient } from '@tanstack/react-query';

import { LogWithId } from '@/features/log/types/Log';
import { BaseApiClient } from '@/lib/BaseApiClient';

import { CreateLogRequest } from '../types/CreateLogRequest';

type RequestType = CreateLogRequest;
type ResponseType = LogWithId;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useCreateLog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await BaseApiClient.post<ResponseType>('/api/log', json);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logs'] });
    },
    onError: () => {},
  });

  return mutation;
};
