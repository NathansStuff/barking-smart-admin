import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod.mjs';
import { z } from 'zod';

import { env } from '@/constants';

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function generateOpenaiContent<T>(config: {
  prompt: string;
  schema: z.ZodSchema;
  systemPrompt: string;
  model?: string;
}): Promise<T> {
  const { prompt, schema, systemPrompt, model = 'gpt-4o-2024-08-06' } = config;

  try {
    const completion = await openai.beta.chat.completions.parse({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: zodResponseFormat(schema, 'event'),
    });

    const content = JSON.parse(completion.choices[0].message.content ?? '');
    return content as T;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
