// services/stripeService.ts

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { ResponseCode } from '@/types/ResponseCode';

import { DeleteSubscriptionRequest } from '../types/DeleteSubscriptionRequest';

export async function deleteSubscription(request: DeleteSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/delete-subscription';
    const response = await BaseApiClient.post<boolean>(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('deleteSubscription', error);
    return false;
  }
}
