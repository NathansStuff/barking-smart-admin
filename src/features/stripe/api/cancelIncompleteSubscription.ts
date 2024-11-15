// services/stripeService.ts

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { ResponseCode } from '@/types/ResponseCode';

import { CancelIncompleteSubscriptionRequest } from '../types/CancelIncompleteSubscriptionRequest';

export async function cancelIncompleteSubscription(request: CancelIncompleteSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/cancel-incomplete-subscription';
    const response = await BaseApiClient.post<boolean>(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('changeSubscription', error);
    return false;
  }
}
