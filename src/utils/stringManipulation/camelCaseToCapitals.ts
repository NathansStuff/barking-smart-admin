import { capitalizeString } from './capitalizeString';

export const camelCaseToCapitals = (str: string): string => {
  return capitalizeString(str.replace(/([A-Z])/g, ' $1').trim());
};
