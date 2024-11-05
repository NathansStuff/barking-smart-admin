import { ProgramWithId } from '@/features/program/types/Program';
import { s3Service } from '@/lib/s3';

import { generatePdf } from '../utils/generatePdf';

export async function generatePdfService(
  program: ProgramWithId,
  variation: number
): Promise<Uint8Array> {
  return generatePdf(program, variation);
}

export async function savePdfService(
  program: ProgramWithId,
  variation: number
): Promise<string> {
  const pdf = await generatePdf(program, variation);
  const filename = `${program._id}/${variation}.pdf`;

  try {
    return await s3Service.uploadBuffer(Buffer.from(pdf), filename);
  } catch (error) {
    console.error('Error saving PDF:', error);
    throw error;
  }
}
