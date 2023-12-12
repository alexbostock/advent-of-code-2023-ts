import { open } from 'fs/promises';
import * as day1 from './lib/1-trebuchet.js';
import * as day10 from './lib/10-pipe-maze.js';
import * as day11 from './lib/11-cosmic-expansion.js';
import * as day12 from './lib/12-hot-springs.js';
import * as day2 from './lib/2-cube-conundrum.js';
import * as day3 from './lib/3-gear-ratios.js';
import * as day4 from './lib/4-scratchcards.js';
import * as day5 from './lib/5-seed-fertiliser.js';
import * as day6 from './lib/6-wait-for-it.js';
import * as day7 from './lib/7-camel-cards.js';
import * as day8 from './lib/8-haunted-wasteland.js';
import * as day9 from './lib/9-mirage-maintenance.js';

const puzzles = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
  day11,
  day12,
];

const puzzleKey = process.argv[2];
const [puzzleNum, partNum] = puzzleKey.split('.');

const inputFile = await open(`input/${puzzleNum}.txt`);
const input = await inputFile.readFile('utf8');
await inputFile.close();

const puzzle = puzzles[parseInt(puzzleNum) - 1];
if (!puzzle) {
  throw new Error(`Cannot find puzzle ${puzzleKey}`);
}

const puzzlePart = partNum === '1' ? puzzle.part1 : puzzle.part2;

console.log(puzzlePart(input));
