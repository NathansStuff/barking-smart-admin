import { BaseApiClient } from '@/features/apiClient/lib/BaseApiClient';

import { Program } from '../types/Program';

export async function generateProgramContent(prompt: string): Promise<Program> {
  const response = await BaseApiClient.post<{ program: Program }>('/api/openai/program-content', { prompt });
  return response.data.program;
}
