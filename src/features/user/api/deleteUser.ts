import { store } from '@/contexts/store';
import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

export async function deleteUser(): Promise<boolean> {
  const userId = store.getState().user._id;

  try {
    const url = `/api/user/${userId}`;
    await BaseApiClient.delete<void>(url);

    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
