import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { RequiredProgramPartial, RequiredProgramWithId } from '../types/RequiredProgram';

interface UpdateRequiredProgramVariables {
  id: string;
  data: RequiredProgramPartial;
}

async function updateRequiredProgram({
  id,
  data,
}: UpdateRequiredProgramVariables): Promise<RequiredProgramWithId> {
  const response = await BaseApiClient.put<RequiredProgramWithId>(
    `/api/required-program/${id}`,
    data
  );
  return response.data;
}

export function useUpdateRequiredProgram(): UseMutationResult<RequiredProgramWithId, Error, UpdateRequiredProgramVariables, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRequiredProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['required-programs'] });
    },
  });
}