import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { EUserRole } from '../types/EUserRole';
import { UserWithId } from '../types/User';

type RequestType = { id: string; role: EUserRole };

export const useUpdateUserRole = (): UseMutationResult<UserWithId, Error, RequestType> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, role }) => {
      const response = await BaseApiClient.put<UserWithId>(`/api/user/${id}/role`, { role });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
