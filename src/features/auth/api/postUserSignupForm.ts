import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { UserWithId } from '@/features/user/types/User';

import { SignupFormRequest } from '../types/SignupFormRequest';

export async function postUserSignupForm(form: SignupFormRequest): Promise<UserWithId | null> {
  try {
    const response = await BaseApiClient.post<UserWithId>('/api/auth/register', form);

    return response.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
