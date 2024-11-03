import { postRequest } from '@/lib/fetch';

import { Program } from '../types/Program';

export async function generateProgramContent(prompt: string): Promise<Program> {
  const response = await postRequest<{ program: Program }>(
    '/api/openai/program-content',
    { prompt }
  );
  return response.data.program;
}
