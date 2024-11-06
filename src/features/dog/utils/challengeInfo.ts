import { EChallenge } from '@/features/program/types/EChallenge';

export function calculateChallengeDistribution(
  energyLevel: number
): Record<EChallenge, number> {
  // For low energy dogs (1-3)
  if (energyLevel <= 3) {
    return {
      [EChallenge.EASY]: 0.7, // 70%
      [EChallenge.MEDIUM]: 0.25, // 25%
      [EChallenge.HARD]: 0.05, // 5%
    };
  }
  // For medium energy dogs (4-7)
  else if (energyLevel <= 7) {
    return {
      [EChallenge.EASY]: 0.3, // 30%
      [EChallenge.MEDIUM]: 0.5, // 50%
      [EChallenge.HARD]: 0.2, // 20%
    };
  }
  // For high energy dogs (8-10)
  else {
    return {
      [EChallenge.EASY]: 0.2, // 20%
      [EChallenge.MEDIUM]: 0.4, // 40%
      [EChallenge.HARD]: 0.4, // 40%
    };
  }
}
