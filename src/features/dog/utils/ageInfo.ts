import { EDuration } from '@/features/program/types/EDuration';

export function calculateAgeEnergy(dateOfBirth: string): number {
  const date = new Date(dateOfBirth);
  const age = new Date().getFullYear() - date.getFullYear();
  if (age <= 2) {
    return 3;
  } else if (age <= 7) {
    return 0;
  } else {
    return -4;
  }
}

export function calculateAgeDurationDistribution(dateOfBirth: string): Record<EDuration, number> {
  const date = new Date(dateOfBirth);
  const age = new Date().getFullYear() - date.getFullYear();

  if (age <= 2) {
    // Young dogs: Focus on quick exercises with some mid-length
    return {
      [EDuration.QUICK]: 0.7, // 70%
      [EDuration.MID]: 0.3, // 30%
      [EDuration.LONG]: 0, // 0%
    };
  } else if (age <= 7) {
    // Adult dogs: Balanced distribution
    return {
      [EDuration.QUICK]: 0.3, // 30%
      [EDuration.MID]: 0.4, // 40%
      [EDuration.LONG]: 0.3, // 30%
    };
  } else {
    // Senior dogs: Focus on shorter exercises
    return {
      [EDuration.QUICK]: 0.6, // 60%
      [EDuration.MID]: 0.3, // 30%
      [EDuration.LONG]: 0.1, // 10%
    };
  }
}
