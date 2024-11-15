import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { ResetPasswordRequest } from '../types/ResetPasswordRequest';

export async function postUserNewPassword(form: ResetPasswordRequest): Promise<boolean> {
  try {
    const res = await BaseApiClient.post<boolean>('/api/auth/new-password', form);
    return res.data;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
