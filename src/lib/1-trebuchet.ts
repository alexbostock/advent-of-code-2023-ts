// --- Day 1: Trebuchet?! ---

export function getCalibrationValue(line: string): number {
  const firstDigit = findFirstDigit(line.split(''));
  const lastDigit = findFirstDigit(line.split('').reverse());
  if (!firstDigit || !lastDigit) {
    throw new Error('Calibration digits missing');
  }
  return parseInt(firstDigit + lastDigit);
}

function findFirstDigit(characters: string[]) {
  return characters.find(char =>
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char),
  );
}
