import { open } from 'node:fs/promises';
import { getCalibrationValue } from './lib/1-trebuchet.js';
import {
  gameId,
  isPossible,
  minimumSetOfCubes,
  parseGame,
} from './lib/2-cube-conundrum.js';
import { listPartNumbers } from './lib/3-gear-ratios.js';

async function trebuchet() {
  const inputFile = await open('input/1-trebuchet.txt', 'r');

  let sum = 0;

  for await (const line of inputFile.readLines()) {
    sum += getCalibrationValue(line);
  }

  console.log(sum);
}

async function cubeConundrum() {
  const inputFile = await open('input/2-cube-conundrum.txt');

  let sum = 0;

  for await (const line of inputFile.readLines()) {
    if (isPossible(line, { red: 12, green: 13, blue: 14 })) {
      sum += gameId(line);
    }
  }

  console.log(sum);
}

async function cubeConundrumMinimums() {
  const inputFile = await open('input/2-cube-conundrum.txt');

  let sum = 0;

  for await (const line of inputFile.readLines()) {
    const game = parseGame(line);
    const minimumCubes = minimumSetOfCubes(game);
    sum += minimumCubes.red * minimumCubes.green * minimumCubes.blue;
  }

  console.log(sum);
}

async function partNumbers() {
  const inputFile = await open('input/3-gear-ratios.txt');

  const schematic = await inputFile.readFile('utf8');

  const partNumbers = listPartNumbers(schematic);
  const sumOfPartNumbers = partNumbers.reduce((sum, num) => sum + num);

  console.log(sumOfPartNumbers);
}

const puzzleKey = process.argv[2];

const puzzleMap: Record<string, () => Promise<void>> = {
  '1': trebuchet,
  '2.1': cubeConundrum,
  '2.2': cubeConundrumMinimums,
  '3.1': partNumbers,
};

const puzzle = puzzleMap[puzzleKey];

if (!puzzle) {
  throw new Error(`Cannot find puzzle ${puzzleKey}`);
}

await puzzle();
