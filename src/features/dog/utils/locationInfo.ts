import { ELocation } from '@/features/program/types/ELocation';

export function calculateLocationDistribution(preferredLocation: ELocation): Record<ELocation, number> {
  return {
    [ELocation.INDOORS]: preferredLocation === ELocation.INDOORS ? 0.8 : 0.2,
    [ELocation.OUTDOORS]: preferredLocation === ELocation.OUTDOORS ? 0.8 : 0.2,
  };
}
