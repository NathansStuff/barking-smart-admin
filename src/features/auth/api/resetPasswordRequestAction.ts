import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { ResetPasswordFormRequest } from '../types/ResetPasswordFormRequest';

export async function resetPasswordRequestAction(form: ResetPasswordFormRequest): Promise<boolean> {
  try {
    await BaseApiClient.post<boolean>('/api/auth/reset-password-request', form);
    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    return false;
  }
}
