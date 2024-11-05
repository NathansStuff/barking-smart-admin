import { Program } from '@/features/program/types/Program';

export async function downloadPdf(
  program: Program,
  variation: number
): Promise<Response> {
  const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ program, variation }),
  });
  return response;
}
