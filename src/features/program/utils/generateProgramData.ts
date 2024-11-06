import {
  MAXIMUM_ENERGY,
  MINIMUM_ENERGY,
  PROGRAM_DAYS,
} from '@/constants/publicInfo';
import { DogWithId } from '@/features/dog/types/Dog';
import { calculateActivityTypeDistribution } from '@/features/dog/utils/activityTypeInfo';
import {
  calculateAgeDurationDistribution,
  calculateAgeEnergy,
} from '@/features/dog/utils/ageInfo';
import { getBreedInfo } from '@/features/dog/utils/breedInfo';
import { calculateChallengeDistribution } from '@/features/dog/utils/challengeInfo';
import { getDayDistribution } from '@/features/dog/utils/energyInfo';
import { getGenderEnergy } from '@/features/dog/utils/genderInfo';
import { getHealthIssuesEnergy } from '@/features/dog/utils/healthInfo';
import { calculateLocationDistribution } from '@/features/dog/utils/locationInfo';

import { generateProgramRequirements, ProgramDay } from './programRequirements';

interface BreedEnergyInfo {
  name: string;
  energy: number;
}

export interface ProgramData {
  energyCalculation: {
    breedOne: BreedEnergyInfo;
    breedTwo: BreedEnergyInfo | null;
    ageEnergy: number;
    healthIssuesEnergy: number;
    genderEnergy: number;
    calculatedEnergy: number;
    adjustedEnergy: number;
  };
  distributions: {
    energyDayDistribution: Record<string, number>;
    durationDistribution: Record<string, number>;
    challengeDistribution: Record<string, number>;
    locationDistribution: Record<string, number>;
    activityTypeDistribution: Record<string, number>;
  };
  programRequirements: ProgramDay[];
}

export function generateProgramData(dog: DogWithId): ProgramData {
  const breedOneInfo = getBreedInfo(dog.breedOne);
  const breedTwoInfo = dog.breedTwo ? getBreedInfo(dog.breedTwo) : null;
  const ageEnergy = calculateAgeEnergy(dog.dateOfBirth.toString());
  const healthIssuesEnergy = getHealthIssuesEnergy(dog.healthIssues);
  const genderEnergy = getGenderEnergy(dog.gender);

  const calculatedEnergy =
    breedOneInfo.energyLevel +
    (breedTwoInfo?.energyLevel || 0) +
    ageEnergy +
    healthIssuesEnergy +
    genderEnergy;

  const adjustedEnergy = Math.min(
    Math.max(calculatedEnergy, MINIMUM_ENERGY),
    MAXIMUM_ENERGY
  );

  const energyDayDistribution = getDayDistribution(adjustedEnergy);
  const durationDistribution = calculateAgeDurationDistribution(
    dog.dateOfBirth.toString()
  );
  const challengeDistribution = calculateChallengeDistribution(adjustedEnergy);
  const locationDistribution = calculateLocationDistribution(dog.location);
  const activityTypeDistribution = calculateActivityTypeDistribution(dog);

  const programRequirements = generateProgramRequirements(
    energyDayDistribution,
    durationDistribution,
    challengeDistribution,
    locationDistribution,
    activityTypeDistribution,
    PROGRAM_DAYS
  );

  return {
    energyCalculation: {
      breedOne: {
        name: breedOneInfo.displayName,
        energy: breedOneInfo.energyLevel,
      },
      breedTwo: breedTwoInfo
        ? { name: breedTwoInfo.displayName, energy: breedTwoInfo.energyLevel }
        : null,
      ageEnergy,
      healthIssuesEnergy,
      genderEnergy,
      calculatedEnergy,
      adjustedEnergy,
    },
    distributions: {
      energyDayDistribution,
      durationDistribution,
      challengeDistribution,
      locationDistribution,
      activityTypeDistribution,
    },
    programRequirements,
  };
}
