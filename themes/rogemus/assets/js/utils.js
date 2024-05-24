export const getRandomIntInRange = (max) => (
  Math.floor(Math.random() * max)
)

export const getRandomFloatInRange = (min, max) => (
  Math.max(Math.random() * max, min)
)
