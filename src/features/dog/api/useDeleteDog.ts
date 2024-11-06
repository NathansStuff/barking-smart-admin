import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

async function deleteDog(id: string): Promise<void> {
  await BaseApiClient.delete(`/api/dog/${id}`);
}

export function useDeleteDog(): UseMutationResult<void, Error, string, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dogs'] });
    },
  });
}