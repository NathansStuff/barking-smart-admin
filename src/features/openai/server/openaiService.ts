import { Program } from '@/features/program/types/Program';
import { generateOpenaiContent } from '@/lib/openai';

import { FieldGenerationResponse } from '../types/OpenaiField';
import { FieldGenerationSchema } from '../types/OpenaiField';
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

export async function generateProgramField(
  fieldName: string,
  context: string
): Promise<string> {
  const systemPrompt = `You are an expert in dog enrichment activities. Generate content for the ${fieldName} field of a dog enrichment activity. Keep the response concise and relevant to the specific field.`;

  console.log(context, '******');

  const response = await generateOpenaiContent<FieldGenerationResponse>({
    prompt: context,
    schema: FieldGenerationSchema,
    systemPrompt,
  });

  // Remove quotes if they exist at start and end of content
  return response.content.replace(/^"(.*)"$/, '$1');
}
