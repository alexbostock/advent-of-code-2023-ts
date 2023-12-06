import { part2 as trebuchetPart2 } from './lib/1-trebuchet.js';
import {
  part1 as cubeConundrumPart1,
  part2 as cubeConundrumPart2,
} from './lib/2-cube-conundrum.js';
import {
  part1 as gearRatiosPart1,
  part2 as gearRatiosPart2,
} from './lib/3-gear-ratios.js';
import {
  part1 as scratchCardsPart1,
  part2 as scratchCardsPart2,
} from './lib/4-scratchcards.js';
import {
  part1 as seedFertiliserPart1,
  part2 as seedFertiliserPart2,
} from './lib/5-seed-fertiliser.js';
import {
  part1 as waitForItPart1,
  part2 as waitForItPart2,
} from './lib/6-wait-for-it.js';

const puzzleKey = process.argv[2];

const puzzleMap: Record<string, () => Promise<void>> = {
  '1': trebuchetPart2,
  '2.1': cubeConundrumPart1,
  '2.2': cubeConundrumPart2,
  '3.1': gearRatiosPart1,
  '3.2': gearRatiosPart2,
  '4.1': scratchCardsPart1,
  '4.2': scratchCardsPart2,
  '5.1': seedFertiliserPart1,
  '5.2': seedFertiliserPart2,
  '6.1': waitForItPart1,
  '6.2': waitForItPart2,
};

const puzzle = puzzleMap[puzzleKey];

if (!puzzle) {
  throw new Error(`Cannot find puzzle ${puzzleKey}`);
}

await puzzle();
