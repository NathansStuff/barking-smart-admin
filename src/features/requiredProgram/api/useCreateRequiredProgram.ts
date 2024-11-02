import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import z from 'zod';

import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { RequiredProgram } from '../types/RequiredProgram';

type RequestType = z.infer<typeof RequiredProgram>;
type ResponseType = RequestType & { _id: string };

export const useCreateRequiredProgram = (): UseMutationResult<
  ResponseType,
  Error,
  RequestType
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async json => {
      const response = await postRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/required-program`,
        json
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['required-programs'] });
    },
  });
};
