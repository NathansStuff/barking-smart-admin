import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

async function deleteEmailTemplate(id: string): Promise<void> {
  await BaseApiClient.delete(`/api/email/templates/${id}`);
}

export function useDeleteEmailTemplate(): UseMutationResult<void, Error, string, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmailTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] });
    },
  });
}