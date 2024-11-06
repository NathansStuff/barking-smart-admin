import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/lib/BaseApiClient';

import { Dog, DogWithId } from '../types/Dog';

async function createDog(dog: Dog): Promise<DogWithId> {
  const response = await BaseApiClient.post<DogWithId>('/api/dog', dog);
  return response.data;
}

async function updateDog(id: string, dog: Partial<Dog>): Promise<DogWithId> {
  const response = await BaseApiClient.put<DogWithId>(`/api/dog/${id}`, dog);
  return response.data;
}

export function useDogMutation(): UseMutationResult<DogWithId, Error, {
    id?: string;
    data: Dog | Partial<Dog>;
}, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id?: string; data: Dog | Partial<Dog> }) => {
      if (variables.id) {
        return updateDog(variables.id, variables.data);
      }
      return createDog(variables.data as Dog);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dogs'] });
    },
  });
}