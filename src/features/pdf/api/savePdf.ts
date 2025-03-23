import { ProgramWithId } from '@/features/program/types/Program';

export async function savePdf(program: ProgramWithId, variation: number): Promise<string> {
  try {
    const response = await fetch('/api/program/save-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ program, variation }),
    });
    if (!response.ok) {
      throw new Error('Failed to save PDF');
    }
    return response.json();
  } catch (error) {
    console.error('Error saving PDF:', error);
    throw error;
  }
}
