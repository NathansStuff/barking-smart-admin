import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { ResponseCode } from '@/types/ResponseCode';

import { EmailTestRequest } from '../types/EmailTestRequest';

export async function postTestEmail(data: EmailTestRequest): Promise<boolean> {
  try {
    const response = await BaseApiClient.post('/api/email/test-email', data);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.log(error);
    return false;
  }
}
