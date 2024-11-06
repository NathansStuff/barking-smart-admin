import { EGender } from '../types/EGender';

export const getGenderEnergy = (gender: EGender): number => {
  if (gender === EGender.MALE) return 1;
  return -1;
};
