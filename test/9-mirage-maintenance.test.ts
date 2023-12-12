import { describe, expect, test } from 'vitest';
import {
  nextInSequence,
  parseInput,
  part1,
  part2,
  previousInSequence,
} from '../src/lib/9-mirage-maintenance.js';

test('part1', () => expect(part1(exampleInput)).toBe(114));

test('part2', () => expect(part2(exampleInput)).toBe(2));

test('parseInput', () => {
  const sequences = parseInput(exampleInput);

  const expected = [
    [0, 3, 6, 9, 12, 15],
    [1, 3, 6, 10, 15, 21],
    [10, 13, 16, 21, 30, 45],
  ];

  expect(sequences).toEqual(expected);
});

describe('nextInSequence', () => {
  const testCases: [number[], number][] = [
    [[0, 3, 6, 9, 12, 15], 18],
    [[1, 3, 6, 10, 15, 21], 28],
    [[10, 13, 16, 21, 30, 45], 68],
  ];

  test.each(testCases)('%j => %i', (sequence, expected) =>
    expect(nextInSequence(sequence)).toBe(expected),
  );
});

describe('previousInSequence', () => {
  const testCases: [number[], number][] = [
    [[0, 3, 6, 9, 12, 15], -3],
    [[1, 3, 6, 10, 15, 21], 0],
    [[10, 13, 16, 21, 30, 45], 5],
  ];

  test.each(testCases)('%j => %i', (sequence, expected) =>
    expect(previousInSequence(sequence)).toBe(expected),
  );
});

const exampleInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;
