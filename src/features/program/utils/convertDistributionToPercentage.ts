export const convertDistributionToPercentages = (distribution: Record<string, number>): Record<string, number> => {
  const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
  return Object.fromEntries(Object.entries(distribution).map(([key, value]) => [key, value / total]));
};
