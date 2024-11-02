import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

async function deleteUser(id: string): Promise<void> {
  await BaseApiClient.delete(`/api/user/${id}`);
}

export function useDeleteUser() :  UseMutationResult<void, Error, string, unknown>
{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}