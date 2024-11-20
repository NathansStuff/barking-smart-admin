import { toast } from 'sonner';

import { useGetUsers } from '../api/useGetUsers';
import { useUpdateUserRole } from '../api/useUpdateUserRole';
import { EUserRole } from '../types/EUserRole';
import { UserWithId } from '../types/User';

export function useUserMutations(): {
  handleRoleUpdate: (id: string, role: EUserRole) => Promise<boolean>;
  isMutating: boolean;
  data: UserWithId[] | undefined;
  isLoading: boolean;
} {
  const updateRoleMutation = useUpdateUserRole();
  const { data: users, isLoading } = useGetUsers();

  const featureName = 'user';

  const handleMutationWithToast = async <T>(
    action: () => Promise<T>,
    operationType: 'create' | 'update' | 'delete'
  ): Promise<boolean> => {
    const loadingToast = toast.loading(`${operationType}ing ${featureName}...`);
    try {
      await action();
      toast.dismiss(loadingToast);
      toast.success(`${featureName} ${operationType}d successfully`);
      return true;
    } catch {
      toast.dismiss(loadingToast);
      toast.error(`Failed to ${operationType} ${featureName}`);
      return false;
    }
  };

  const handleRoleUpdate = (id: string, role: EUserRole): Promise<boolean> =>
    handleMutationWithToast(() => updateRoleMutation.mutateAsync({ id, role }), 'update');

  return {
    handleRoleUpdate,
    isMutating: updateRoleMutation.isPending,
    data: users,
    isLoading,
  };
}
