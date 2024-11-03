import { postRequest } from '@/lib/fetch';

export async function generateProgramFieldname(
  fieldName: string,
  context: string
): Promise<string> {
  const response = await postRequest<{ content: string }>(
    '/api/openai/program-fieldname',
    { fieldName, context }
  );
  return response.data.content;
}
