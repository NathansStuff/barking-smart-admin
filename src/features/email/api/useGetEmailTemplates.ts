import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { EmailTemplateWithId } from '../types/EmailTemplate';

interface GetEmailTemplatesResponse {
  emailTemplates: EmailTemplateWithId[];
  total: number;
}

async function getEmailTemplates(): Promise<GetEmailTemplatesResponse> {
  const response = await BaseApiClient.get<GetEmailTemplatesResponse>('/api/email/templates');
  return response.data;
}

export function useGetEmailTemplates(): UseQueryResult<GetEmailTemplatesResponse, Error> {
  return useQuery({
    queryKey: ['emailTemplates'],
    queryFn: getEmailTemplates,
  });
}
