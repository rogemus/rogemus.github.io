export const getRandomIntInRange = (max: number): number => Math.floor(Math.random() * max);

export const getRandomFloatInRange = (min: number, max: number): number =>
  Math.max(Math.random() * max, min);
