import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { env } from '@/constants';
import { postRequest } from '@/lib/fetch';

import { Program, ProgramWithId } from '../types/Program';

type RequestType = Program;
type ResponseType = ProgramWithId;

export const useCreateProgram = (): UseMutationResult<
  ResponseType,
  Error,
  RequestType
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await postRequest<ResponseType>(
        `${env.NEXT_PUBLIC_BASE_URL}/api/program`,
        json
      );
      console.log(response.data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] });
    },
    onError: () => {},
  });

  return mutation;
};
