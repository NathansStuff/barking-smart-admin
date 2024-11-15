import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

export async function postValidateUser(userId: string): Promise<boolean> {
  try {
    const response = await BaseApiClient.get<{ isValid: boolean }>(`/api/auth/validate-email/${userId}`);

    return response.data.isValid;
  } catch (error) {
    console.log(error);
    return false;
  }
}
