import { EEnergyLevel } from '../types/EEnergyLevel';

export function determineEnergyLevel(num: number): EEnergyLevel {
  if (num <= 3) {
    return EEnergyLevel.LOW;
  } else if (num <= 6) {
    return EEnergyLevel.MEDIUM;
  } else {
    return EEnergyLevel.HIGH;
  }
}

export function energyLevelToNumeric(level: EEnergyLevel): [number, number] {
  switch (level) {
    case EEnergyLevel.LOW:
      return [1, 3];
    case EEnergyLevel.MEDIUM:
      return [4, 7];
    case EEnergyLevel.HIGH:
      return [8, 10];
    default:
      return [1, 10];
  }
}