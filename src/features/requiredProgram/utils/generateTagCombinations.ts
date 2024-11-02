
import { EActivityType } from '@/features/program/types/EActivityType';
import { EChallenge } from '@/features/program/types/EChallenge';
import { EDuration } from '@/features/program/types/EDuration';
import { EEnergyLevel } from '@/features/program/types/EEnergyLevel';
import { ELocation } from '@/features/program/types/ELocation';
import { ESpace } from '@/features/program/types/ESpace';

import { RequiredProgramWithId } from '../types/RequiredProgram';

interface TagCombination {
  location?: ELocation;
  energyLevel?: EEnergyLevel;
  duration?: EDuration;
  challenge?: EChallenge;
  type?: EActivityType[];
  space?: ESpace;
}

export function generateTagCombinations(): TagCombination[] {
  const combinations: TagCombination[] = [];

  // Generate all possible combinations
  for (const location of Object.values(ELocation)) {
    for (const energyLevel of Object.values(EEnergyLevel)) {
      for (const duration of Object.values(EDuration)) {
        for (const challenge of Object.values(EChallenge)) {
          for (const space of Object.values(ESpace)) {
            // For activity types, we'll just use single types for simplicity
            // You can modify this if you need combinations of activity types
            for (const type of Object.values(EActivityType)) {
              combinations.push({
                location,
                energyLevel,
                duration,
                challenge,
                type: [type],
                space,
              });
            }
          }
        }
      }
    }
  }

  return combinations;
}

export function mergeWithExistingPrograms(
  combinations: TagCombination[],
  existingPrograms: RequiredProgramWithId[]
): RequiredProgramWithId[] {
  return combinations.map(combo => {
    // Find matching existing program
    const existing = existingPrograms.find(
      prog =>
        prog.tags.location === combo.location &&
        prog.tags.energyLevel === combo.energyLevel &&
        prog.tags.duration === combo.duration &&
        prog.tags.challenge === combo.challenge &&
        prog.tags.space === combo.space &&
        JSON.stringify(prog.tags.type) === JSON.stringify(combo.type)
    );

    if (existing) {
      return existing;
    }

    // Create a new "virtual" program with count 0
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      _id: (`virtual_${Object.values(combo).join('_')}`) as any, // This ID helps React with keys
      tags: combo,
      count: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
}
