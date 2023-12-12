export interface Race {
  time: number;
  distanceRecord: number;
}

export function part1(input: string): number {
  const races = parseRaces(input);
  return races
    .map(race => waystoWin(race).length)
    .reduce((prod, num) => prod * num);
}

export function part2(input: string): number {
  const race = parseRacePart2(input);
  return waystoWin(race).length;
}

export function parseRaces(serialised: string): Race[] {
  const [line1, line2] = serialised.split('\n');
  const [, timesSerialised] = line1.split(':');
  const [, distancesSerialised] = line2.split(':');

  const times = timesSerialised
    .split(' ')
    .filter(val => val !== '')
    .map(num => parseInt(num));
  const distances = distancesSerialised
    .split(' ')
    .filter(val => val !== '')
    .map(num => parseInt(num));

  return times.map((time, index) => ({
    time,
    distanceRecord: distances[index],
  }));
}

export function parseRacePart2(serialised: string): Race {
  const [line1, line2] = serialised.split('\n');
  const [, timeSerialised] = line1.split(':');
  const [, distanceSerialised] = line2.split(':');

  const time = timeSerialised
    .split('')
    .filter(char => char !== ' ')
    .join('');
  const distance = distanceSerialised
    .split('')
    .filter(char => char !== ' ')
    .join('');

  return {
    time: parseInt(time),
    distanceRecord: parseInt(distance),
  };
}

export function distanceTravelled(race: Race, buttonTime: number): number {
  const speed = buttonTime;
  const movingTime = race.time - buttonTime;
  return speed * movingTime;
}

export function waystoWin(race: Race): number[] {
  const winningButtonTimes: number[] = [];

  for (
    let candidateButtonTime = 0;
    candidateButtonTime < race.time;
    candidateButtonTime++
  ) {
    if (distanceTravelled(race, candidateButtonTime) > race.distanceRecord) {
      winningButtonTimes.push(candidateButtonTime);
    }
  }

  return winningButtonTimes;
}
