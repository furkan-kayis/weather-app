const symbols = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

export default function directionConverter(degree: number) {
  let steps = 0;

  if (degree > 348.75) {
    return symbols[0];
  }

  for (let i = 11.25; i <= 348.75; i += 22.5) {
    if (degree < i) {
      return symbols[steps];
    }
    steps += 1;
  }

  return symbols[steps];
}
