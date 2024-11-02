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
