import { useQuery } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { GuestbookMessageWithUser } from '../types/GuestbookMessageWithUser';

type ResponseType = { messages: GuestbookMessageWithUser[] };

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetGuestbookMessages() {
  const query = useQuery({
    queryKey: ['guestbookMessages'],
    queryFn: async () => {
      const response = await BaseApiClient.get<ResponseType>('/api/guestbook-message');
      return response.data;
    },
  });

  return query;
}
