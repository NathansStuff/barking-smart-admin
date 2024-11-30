import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { EmailTemplate, EmailTemplatePartial, EmailTemplateWithId } from '../types/EmailTemplate';

async function createEmailTemplate(emailTemplate: EmailTemplate): Promise<EmailTemplateWithId> {
  const response = await BaseApiClient.post<EmailTemplateWithId>('/api/email/templates', emailTemplate);
  return response.data;
}

async function updateEmailTemplate(id: string, emailTemplate: EmailTemplatePartial): Promise<EmailTemplateWithId> {
  const response = await BaseApiClient.put<EmailTemplateWithId>(`/api/email/templates/${id}`, emailTemplate);
  return response.data;
}

export function useEmailTemplateMutation(): UseMutationResult<
  EmailTemplateWithId,
  Error,
  {
    id?: string;
    data: EmailTemplate | EmailTemplatePartial;
  },
  unknown
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { id?: string; data: EmailTemplate | EmailTemplatePartial }) => {
      if (variables.id) {
        return updateEmailTemplate(variables.id, variables.data as EmailTemplatePartial);
      }
      return createEmailTemplate(variables.data as EmailTemplate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emailTemplates'] });
    },
  });
}
