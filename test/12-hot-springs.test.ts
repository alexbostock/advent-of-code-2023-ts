import { describe, expect, test } from 'vitest';
import {
  numPossibleArrangements,
  parseAndTrimLine,
  part1,
  part2,
  preprocessLinePart2,
  type Springs,
} from '../src/lib/12-hot-springs.js';

test('part1', () => expect(part1(exampleInput)).toEqual(21));

test('part2', () => expect(part2(exampleInput)).toEqual(525152));

describe('numPossibleArrangements', () => {
  const testCases: [string, number][] = [
    ['# 1', 1],
    ['. 1', 0],
    ['? 1', 1],
    ['?? 1', 2],
    ['??? 1', 3],
    ['??? 1,1', 1],
    ['???.### 1,1,3', 1],
    ['.??..??...?##. 1,1,3', 4],
    ['?#?#?#?#?#?#?#? 1,3,1,6', 1],
    ['????.#...#... 4,1,1', 1],
    ['????.######..#####. 1,6,5', 4],
    ['?###???????? 3,2,1', 10],
    ['???#???????#??#.??? 1,12', 2],
  ];

  test.each(testCases)('%s => %i', (line, expected) =>
    expect(numPossibleArrangements(parseAndTrimLine(line))).toEqual(expected),
  );
});

describe('parseAndTrimLine', () => {
  const testCases: [string, Springs][] = [
    [
      '???.### 1,1,3',
      {
        springs: ['?', '?', '?', '.', '#', '#', '#'],
        contiguousGroups: [1, 1, 3],
      },
    ],
    [
      '.??..??...?##. 1,1,3',
      {
        springs: ['?', '?', '.', '.', '?', '?', '.', '.', '.', '?', '#', '#'],
        contiguousGroups: [1, 1, 3],
      },
    ],
    [
      '????.#...#... 4,1,1',
      {
        springs: ['?', '?', '?', '?', '.', '#', '.', '.', '.', '#'],
        contiguousGroups: [4, 1, 1],
      },
    ],
  ];

  test.each(testCases)('%s', (line, expected) =>
    expect(parseAndTrimLine(line)).toEqual(expected),
  );
});

test('preprocessLinePart2', () => {
  const transformed = preprocessLinePart2('???.### 1,1,3');

  const expected =
    '???.###????.###????.###????.###????.### 1,1,3,1,1,3,1,1,3,1,1,3,1,1,3';

  expect(transformed).toEqual(expected);
});

const exampleInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1
`;
