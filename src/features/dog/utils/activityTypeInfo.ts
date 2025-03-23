import { DogWithId } from '@/features/dog/types/Dog';
import { EActivityType } from '@/features/program/types/EActivityType';

export function calculateActivityTypeDistribution(dog: DogWithId): Record<EActivityType, number> {
  const baseDistribution = {
    [EActivityType.PHYSICAL]: 0.25,
    [EActivityType.MENTAL]: 0.15,
    [EActivityType.SENSORY]: 0.15,
    [EActivityType.SOCIAL]: 0.15,
    [EActivityType.FEEDING]: 0.1,
    [EActivityType.ENVIRONMENTAL]: 0.1,
    [EActivityType.OCCUPATIONAL]: 0.1,
  };

  // Adjust based on how active the dog is
  if (dog.howActive >= 8) {
    baseDistribution[EActivityType.PHYSICAL] += 0.1;
    baseDistribution[EActivityType.MENTAL] -= 0.05;
    baseDistribution[EActivityType.ENVIRONMENTAL] -= 0.05;
  } else if (dog.howActive <= 3) {
    baseDistribution[EActivityType.PHYSICAL] -= 0.1;
    baseDistribution[EActivityType.MENTAL] += 0.05;
    baseDistribution[EActivityType.ENVIRONMENTAL] += 0.05;
  }

  // Adjust if food orientated
  if (dog.foodOrientated) {
    baseDistribution[EActivityType.FEEDING] += 0.05;
    baseDistribution[EActivityType.PHYSICAL] -= 0.05;
  }

  // Adjust if health issues present
  if (dog.healthIssues.length > 0) {
    baseDistribution[EActivityType.PHYSICAL] -= 0.05;
    baseDistribution[EActivityType.MENTAL] += 0.05;
  }

  // Normalize the distribution to ensure sum is 1
  const total = Object.values(baseDistribution).reduce((a, b) => a + b, 0);
  Object.keys(baseDistribution).forEach((key) => {
    baseDistribution[key as EActivityType] = Number((baseDistribution[key as EActivityType] / total).toFixed(2));
  });

  return baseDistribution;
}
