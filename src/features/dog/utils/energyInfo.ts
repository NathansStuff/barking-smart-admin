import { ENERGY_DISTRIBUTION, MAXIMUM_ENERGY, MINIMUM_ENERGY, PROGRAM_DAYS } from '@/data/publicInfo';

export const getDayDistribution = (energy: number): Record<string, number> => {
  if (energy === MINIMUM_ENERGY) {
    return {
      'Level 1': Math.round(PROGRAM_DAYS * 0.75),
      'Level 2': Math.round(PROGRAM_DAYS * 0.25),
    };
  }

  if (energy === MAXIMUM_ENERGY) {
    return {
      'Level 9': Math.round(PROGRAM_DAYS * 0.25),
      'Level 10': Math.round(PROGRAM_DAYS * 0.75),
    };
  }

  return {
    [`Level ${energy - 1}`]: Math.round(PROGRAM_DAYS * ENERGY_DISTRIBUTION[0]),
    [`Level ${energy}`]: Math.round(PROGRAM_DAYS * ENERGY_DISTRIBUTION[1]),
    [`Level ${energy + 1}`]: Math.round(PROGRAM_DAYS * ENERGY_DISTRIBUTION[2]),
  };
};
