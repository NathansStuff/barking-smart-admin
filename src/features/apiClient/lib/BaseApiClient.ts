import { env } from '@/constants';

import { initializeApiClient } from '../service/clientInstance';

export const BaseApiClient = initializeApiClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
});

export const BaseApiClientWithMultipart = initializeApiClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
