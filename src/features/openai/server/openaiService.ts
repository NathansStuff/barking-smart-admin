import { Program } from '@/features/program/types/Program';
import { generateOpenaiContent } from '@/lib/openai';

import { OpenaiProgramSchema } from '../types/OpenaiProgram';

export async function generateProgramContent(prompt: string): Promise<Program> {
  const systemPrompt =
    'You are an expert in dog enrichment activities. Given the following information, generate the rest of the activity info. You should respond with bullet points and/or step by step instructions. If you are given information, use it to generate the rest of the activity info.';

  return generateOpenaiContent({
    prompt,
    schema: OpenaiProgramSchema,
    systemPrompt,
  });
}
