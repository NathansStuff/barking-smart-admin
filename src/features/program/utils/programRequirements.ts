import { EActivityType } from '../types/EActivityType';
import { EChallenge } from '../types/EChallenge';
import { EDuration } from '../types/EDuration';
import { ELocation } from '../types/ELocation';

export interface ProgramDay {
  day: number;
  requirements: {
    energyLevel: number;
    duration: EDuration;
    challenge: EChallenge;
    location: ELocation;
    activityType: EActivityType;
  };
}

export function generateProgramRequirements(
  energyDayDistribution: Record<number, number>,
  durationDistribution: Record<EDuration, number>,
  challengeDistribution: Record<EChallenge, number>,
  locationDistribution: Record<ELocation, number>,
  activityTypeDistribution: Record<EActivityType, number>,
  totalDays: number
): ProgramDay[] {
  const programDays: ProgramDay[] = [];

  // Convert distributions to arrays of values based on their percentages
  const energyDays = flattenDistribution(energyDayDistribution);
  const durations = flattenDistribution(durationDistribution, totalDays);
  const challenges = flattenDistribution(challengeDistribution, totalDays);
  const locations = flattenDistribution(locationDistribution, totalDays);
  const activityTypes = flattenDistribution(activityTypeDistribution, totalDays);

  // Shuffle arrays
  shuffleArray(durations);
  shuffleArray(challenges);
  shuffleArray(locations);
  shuffleArray(activityTypes);

  // Create program days
  for (let day = 0; day < totalDays; day++) {
    programDays.push({
      day: day + 1,
      requirements: {
        energyLevel: energyDays[day],
        duration: durations[day] as EDuration,
        challenge: challenges[day] as EChallenge,
        location: locations[day] as ELocation,
        activityType: activityTypes[day] as EActivityType,
      },
    });
  }

  return programDays;
}

// Helper function to convert percentage distributions to arrays of values
function flattenDistribution<T extends string | number>(distribution: Record<T, number>, totalItems?: number): T[] {
  const result: T[] = [];
  (Object.entries(distribution) as [string, number][]).forEach(([key, count]) => {
    const value = key as T;
    const numberOfItems = totalItems ? Math.round(count * totalItems) : count;
    result.push(...Array(numberOfItems).fill(value));
  });
  return result;
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
