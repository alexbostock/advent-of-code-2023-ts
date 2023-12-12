export function part1(input: string) {
  let sum = 0;
  for (const line of input.split('\n').slice(0, -1)) {
    sum += getCalibrationValuePart1(line);
  }
  return sum;
}

export function part2(input: string) {
  let sum = 0;
  for (const line of input.split('\n').slice(0, -1)) {
    sum += getCalibrationValue(line);
  }
  return sum;
}

const digitRe = /[0-9]|one|two|three|four|five|six|seven|eight|nine/g;

export function getCalibrationValuePart1(line: string): number {
  const digits = line
    .split('')
    .filter(char =>
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char),
    );
  const firstDigit = digits.at(0);
  const lastDigit = digits.at(-1);
  if (!firstDigit || !lastDigit) {
    throw new Error('No digits');
  }
  return parseInt(firstDigit + lastDigit);
}

export function getCalibrationValue(line: string): number {
  return parseInt(findFirstMatch(line) + findLastMatch(line));
}

function findFirstMatch(line: string) {
  const matches = [...line.matchAll(digitRe)];
  const firstMatch = matches.at(0);
  if (!firstMatch) {
    throw new Error('Cannot find first calibration digit');
  }
  return normaliseStringDigit(firstMatch[0]);
}

function findLastMatch(line: string) {
  for (let i = line.length - 1; i >= 0; i--) {
    const lineSuffix = line.slice(i);
    const matches = [...lineSuffix.matchAll(digitRe)];
    const lastMatch = matches.at(-1);
    if (lastMatch) {
      return normaliseStringDigit(lastMatch[0]);
    }
  }
  throw new Error('Cannot find last calibration digit');
}

function normaliseStringDigit(digit: string): string {
  const mapping: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  return mapping[digit] ?? digit;
}
