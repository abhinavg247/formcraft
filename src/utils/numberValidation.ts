export const isMinDefined = (min: number | undefined | null): boolean => {
  return min !== undefined && min !== null && !isNaN(min);
};

export const isMaxDefined = (max: number | undefined | null): boolean => {
  return max !== undefined && max !== null && !isNaN(max);
};
