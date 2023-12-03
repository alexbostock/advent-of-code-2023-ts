interface Coords {
  x: number;
  y: number;
}

interface SchematicNumber {
  num: number;
  x: number;
  y: number;
  len: number;
}

export function listPartNumbers(schematic: string): number[] {
  const lines = schematic.split('\n');

  const symbolPositions: Coords[] = lines.flatMap((line, y) =>
    line
      .split('')
      .map((char, x) => ({
        char,
        x,
      }))
      .filter(({ char }) => isSymbol(char))
      .map(({ x }) => ({ x, y })),
  );

  const numbers: SchematicNumber[] = lines.flatMap((line, y) => {
    const numbers: SchematicNumber[] = [];

    let digitsAccumulator: string[] = [];
    for (let i = 0; i < line.length; i++) {
      if (isDigit(line[i])) {
        digitsAccumulator.push(line[i]);
      } else {
        if (digitsAccumulator.length) {
          numbers.push({
            num: parseInt(digitsAccumulator.join('')),
            x: i - digitsAccumulator.length,
            y,
            len: digitsAccumulator.length,
          });
          digitsAccumulator = [];
        }
      }
    }
    if (digitsAccumulator.length) {
      numbers.push({
        num: parseInt(digitsAccumulator.join('')),
        x: line.length - digitsAccumulator.length,
        y,
        len: digitsAccumulator.length,
      });
      digitsAccumulator = [];
    }

    return numbers;
  });

  return numbers
    .filter(number => isPartNumber(number, symbolPositions))
    .map(({ num }) => num);
}

function isPartNumber(number: SchematicNumber, symbolPositions: Coords[]) {
  for (
    let positionInNumber = 0;
    positionInNumber < number.len;
    positionInNumber++
  ) {
    const position = {
      x: number.x + positionInNumber,
      y: number.y,
    };

    for (const symbolPosition of symbolPositions) {
      const isAdjacent =
        Math.abs(position.x - symbolPosition.x) <= 1 &&
        Math.abs(position.y - symbolPosition.y) <= 1;
      if (isAdjacent) {
        return true;
      }
    }
  }
  return false;
}

function isSymbol(char: string) {
  return char !== '.' && !isDigit(char);
}

function isDigit(char: string) {
  return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(char);
}
