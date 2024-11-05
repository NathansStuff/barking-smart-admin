import { Program } from '@/features/program/types/Program';

import { getActivityHTML1 } from '../components/PdfTemplate1';
import { getActivityHTML2 } from '../components/PdfTemplate2';

export function getPdfVariation(variation: number, program: Program): string {
  if (variation === 1) {
    return getActivityHTML1(program);
  }
  if (variation === 2) {
    return getActivityHTML2(program);
  }
  return '';
}
