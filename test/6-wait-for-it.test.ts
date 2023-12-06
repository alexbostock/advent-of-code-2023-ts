import { describe, expect, test } from 'vitest';
import {
  distanceTravelled,
  parseRacePart2,
  parseRaces,
  part1Answer,
  part2Answer,
  waystoWin,
  type Race,
} from '../src/lib/6-wait-for-it.js';

test('part1Answer', () => {
  expect(part1Answer(exampleInput)).toBe(288);
});

test('part2Answer', () => {
  expect(part2Answer(exampleInput)).toBe(71503);
});

test('parseRaces', () => {
  const expected: Race[] = [
    { time: 7, distanceRecord: 9 },
    { time: 15, distanceRecord: 40 },
    { time: 30, distanceRecord: 200 },
  ];

  expect(parseRaces(exampleInput)).toEqual(expected);
});

test('parseRacePart2', () => {
  expect(parseRacePart2(exampleInput)).toEqual({
    time: 71530,
    distanceRecord: 940200,
  });
});

describe('distanceTravelled (7 ms race)', () => {
  const testRace: Race = { time: 7, distanceRecord: 9 };

  const testCases: [buttonTime: number, expectedDistance: number][] = [
    [0, 0],
    [1, 6],
    [2, 10],
    [3, 12],
    [4, 12],
    [5, 10],
    [6, 6],
    [7, 0],
  ];

  test.each(testCases)('%n => %n', (buttonTime, expected) => {
    expect(distanceTravelled(testRace, buttonTime)).toBe(expected);
  });
});

const exampleInput = `Time:      7  15   30
Distance:  9  40  200
`;

test('waysToWin', () => {
  const waysToWin = waystoWin({ time: 7, distanceRecord: 9 });

  const expectedWinningButtonTimes = [2, 3, 4, 5];

  expect(waysToWin).toEqual(expectedWinningButtonTimes);
});
