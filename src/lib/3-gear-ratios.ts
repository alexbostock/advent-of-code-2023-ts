import { type FileHandle } from 'node:fs/promises';

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

export async function part1(inputFile: FileHandle) {
  const schematic = await inputFile.readFile('utf8');

  const partNumbers = listPartNumbers(schematic);
  const sumOfPartNumbers = partNumbers.reduce((sum, num) => sum + num);

  console.log(sumOfPartNumbers);
}

export async function part2(inputFile: FileHandle) {
  const schematic = await inputFile.readFile('utf8');

  const gearRatios = listGearRatios(schematic);
  const sum = gearRatios.reduce((sum, num) => sum + num);

  console.log(sum);
}

export function listGearRatios(schematic: string): number[] {
  const parts = listParts(schematic);

  const lines = schematic.split('\n');

  const starPositions: Coords[] = lines.flatMap((line, y) =>
    line
      .split('')
      .map((char, x) => ({ char, x }))
      .filter(({ char }) => char === '*')
      .map(({ x }) => ({ x, y })),
  );

  const gearRatios: number[] = [];

  for (const starPosition of starPositions) {
    const adjacentParts = parts.filter(({ x, y, len }) => {
      for (
        let positionInNumber = 0;
        positionInNumber < len;
        positionInNumber++
      ) {
        const position = { x: x + positionInNumber, y };
        const isAdjacent =
          Math.abs(position.x - starPosition.x) <= 1 &&
          Math.abs(position.y - starPosition.y) <= 1;
        if (isAdjacent) {
          return true;
        }
      }
      return false;
    });

    const isGear = adjacentParts.length === 2;
    if (isGear) {
      const ratio = adjacentParts.reduce(
        (product, { num }) => product * num,
        1,
      );
      gearRatios.push(ratio);
    }
  }

  return gearRatios;
}

export function listPartNumbers(schematic: string): number[] {
  return listParts(schematic).map(({ num }) => num);
}

function listParts(schematic: string): SchematicNumber[] {
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

  return numbers.filter(number => isPartNumber(number, symbolPositions));
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
