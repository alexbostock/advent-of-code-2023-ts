import { open } from 'node:fs/promises';
import { getCalibrationValue } from './lib/1-trebuchet.js';
import { gameId, isPossible } from './lib/2-cube-conundrum.js';

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

const puzzleKey = process.argv[2];

const puzzleMap: Record<string, () => Promise<void>> = {
  '1': trebuchet,
  '2': cubeConundrum,
};

const puzzle = puzzleMap[puzzleKey];

if (!puzzle) {
  throw new Error(`Cannot find puzzle ${puzzleKey}`);
}

await puzzle();
