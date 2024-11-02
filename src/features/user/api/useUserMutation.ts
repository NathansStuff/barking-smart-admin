import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { User, UserWithId } from '../types/User';

async function createUser(user: User): Promise<UserWithId> {
  const response = await BaseApiClient.post<UserWithId>('/api/user', user);
  return response.data;
}

async function updateUser(id: string, user: Partial<User>): Promise<UserWithId> {
  const response = await BaseApiClient.put<UserWithId>(`/api/user/${id}`, user);
  return response.data;
}

export function useUserMutation(): UseMutationResult<UserWithId, Error, {
    id?: string;
    data: User | Partial<User>;
}, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id?: string; data: User | Partial<User> }) => {
      if (variables.id) {
        return updateUser(variables.id, variables.data);
      }
      return createUser(variables.data as User);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}