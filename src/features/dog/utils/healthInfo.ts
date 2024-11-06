import { EHealthIssues } from '../types/EHealthIssues';

export const getHealthIssuesEnergy = (
  healthIssues: EHealthIssues[]
): number => {
  let score = 0;
  if (healthIssues.includes(EHealthIssues.HEALTH_ISSUES)) score = -2;
  if (healthIssues.includes(EHealthIssues.CHRONIC_ILLNESS)) score += -3;
  if (healthIssues.includes(EHealthIssues.INJURY_RECOVERY)) score += -1;
  if (healthIssues.includes(EHealthIssues.MENTAL_HEALTH)) score += -1;
  return score;
};
