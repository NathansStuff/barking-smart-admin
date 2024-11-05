import { ProgramWithId } from '@/features/program/types/Program';

export async function downloadPdf(
  program: ProgramWithId,
  variation: number
): Promise<Response> {
  const response = await fetch('/api/program/generate-pdf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ program, variation }),
  });
  return response;
}
