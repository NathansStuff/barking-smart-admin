import { initializeApiClient } from '@operation-firefly/api-toolkit';

import { env } from '@/constants';

export const BaseApiClient = initializeApiClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
});

export const BaseApiClientWithMultipart = initializeApiClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
