import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { ValidateTokenRequest } from '../types/ValidateTokenRequest';

export async function validateToken(token: string): Promise<boolean> {
  try {
    const form: ValidateTokenRequest = {
      token,
    };
    const response = await BaseApiClient.post<{ isValid: boolean }>('/api/auth/validate-token', form);

    return response.data.isValid;
  } catch (error) {
    console.log('error', error);
    return false;
  }
}
