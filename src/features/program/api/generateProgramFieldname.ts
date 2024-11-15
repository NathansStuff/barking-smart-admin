import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

export async function generateProgramFieldname(fieldName: string, context: string): Promise<string> {
  const response = await BaseApiClient.post<{ content: string }>('/api/openai/program-fieldname', {
    fieldName,
    context,
  });
  return response.data.content;
}
