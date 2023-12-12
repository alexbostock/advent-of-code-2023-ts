import { describe, expect, test } from 'vitest';
import {
  distanceBetween,
  expandCosmos,
  expansionJumps,
  findGalaxies,
  part1,
  part2,
  type Coords,
  type Jumps,
} from '../src/lib/11-cosmic-expansion.js';

test('part1', () => expect(part1(exampleInput)).toBe(374));

test('part2 (10)', () => expect(part2(exampleInput, 10)).toBe(1030));

test('part2 (100)', () => expect(part2(exampleInput, 100)).toBe(8410));

test('expandCosmos', () => {
  const expanded = expandCosmos(exampleInput);

  const expected = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......
`;

  expect(expanded).toEqual(expected);
});

test('findGalaxies', () => {
  const galaxies = findGalaxies(exampleInput);

  const expected = [
    { x: 3, y: 0 },
    { x: 7, y: 1 },
    { x: 0, y: 2 },
    { x: 6, y: 4 },
    { x: 1, y: 5 },
    { x: 9, y: 6 },
    { x: 7, y: 8 },
    { x: 0, y: 9 },
    { x: 4, y: 9 },
  ];

  expect(galaxies).toEqual(expected);
});

describe('distanceBetween', () => {
  const testCases: [[Coords, Coords], number][] = [
    [
      [
        { x: 2, y: 3 },
        { x: 2, y: 3 },
      ],
      0,
    ],
    [
      [
        { x: 1, y: 6 },
        { x: 5, y: 11 },
      ],
      9,
    ],
    [
      [
        { x: 4, y: 0 },
        { x: 10, y: 9 },
      ],
      15,
    ],
    [
      [
        { x: 0, y: 2 },
        { x: 12, y: 7 },
      ],
      17,
    ],
    [
      [
        { x: 0, y: 11 },
        { x: 5, y: 11 },
      ],
      5,
    ],
  ];

  test.each(testCases)('%j => %i', ([pos1, pos2], expected) =>
    expect(distanceBetween(pos1, pos2)).toBe(expected),
  );

  test('example with jump', () => {
    const distance = distanceBetween(
      { x: 1, y: 0 },
      { x: 3, y: 0 },
      { xJumps: [2], yJumps: [2] },
      2,
    );

    expect(distance).toBe(3);
  });
});

test('expansionJumps', () => {
  const jumps = expansionJumps(exampleInput);

  const expected: Jumps = {
    xJumps: [2, 5, 8],
    yJumps: [3, 7],
  };

  expect(jumps).toEqual(expected);
});

const exampleInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....
`;
