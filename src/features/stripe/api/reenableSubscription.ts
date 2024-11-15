// services/stripeService.ts

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';
import { ResponseCode } from '@/types/ResponseCode';

import { ReenableSubscriptionRequest } from '../types/ReenableSubscriptionRequest';

export async function reenableSubscription(request: ReenableSubscriptionRequest): Promise<boolean> {
  try {
    const url = '/api/stripe/reenable-subscription';
    const response = await BaseApiClient.post<boolean>(url, request);
    return response.status === ResponseCode.OK;
  } catch (error) {
    console.error('deleteSubscription', error);
    return false;
  }
}
