export function part1(input: string) {
  const sequences = parseInput(input);
  const nextInEachSequence = sequences.map(nextInSequence);
  return nextInEachSequence.reduce((sum, num) => sum + num);
}

export function part2(input: string) {
  const sequences = parseInput(input);
  const previousInEachSequence = sequences.map(previousInSequence);
  return previousInEachSequence.reduce((sum, num) => sum + num);
}

export function parseInput(input: string): number[][] {
  const lines = input.split('\n').filter(val => val !== '');
  return lines.map(line => line.split(' ').map(num => parseInt(num)));
}

export function nextInSequence(sequence: number[]): number {
  const isAllZeroes = sequence.every(num => num === 0);
  if (isAllZeroes) {
    return 0;
  }

  const differences = sequence
    .slice(1)
    .map((num, index) => num - sequence[index]);
  const nextDifference = nextInSequence(differences);
  return sequence[sequence.length - 1] + nextDifference;
}

export function previousInSequence(sequence: number[]): number {
  const isAllZeroes = sequence.every(num => num === 0);
  if (isAllZeroes) {
    return 0;
  }

  const differences = sequence
    .slice(1)
    .map((num, index) => num - sequence[index]);
  const previousDifference = previousInSequence(differences);
  return sequence[0] - previousDifference;
}
