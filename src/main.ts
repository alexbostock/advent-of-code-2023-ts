import { open } from 'node:fs/promises';
import { getCalibrationValue } from './lib/1-trebuchet.js';

async function trebuchet() {
  const inputFile = await open('input/1-trebuchet.txt', 'r');

  let sum = 0;

  for await (const line of inputFile.readLines()) {
    sum += getCalibrationValue(line);
  }

  console.log(sum);
}

await trebuchet();
