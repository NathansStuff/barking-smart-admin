import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { EmailTemplateWithId } from '../types/EmailTemplate';

async function getEmailTemplate(id: string): Promise<EmailTemplateWithId> {
  const response = await BaseApiClient.get<EmailTemplateWithId>(`/api/email/templates/${id}`);
  return response.data;
}

export function useGetEmailTemplate(id: string): UseQueryResult<EmailTemplateWithId, Error> {
  return useQuery({
    queryKey: ['emailTemplate', id],
    queryFn: () => getEmailTemplate(id),
    enabled: !!id,
  });
}
