import { describe, expect, test } from 'vitest';
import {
  findHorizontalMirrorLine,
  findHorizontalMirrorLineWithSmudge,
  findVerticalMirrorLine,
  findVerticalMirrorLineWithSmudge,
  part1,
  part2,
} from '../src/lib/13-point-of-incidence.js';

test('part1', () => expect(part1(exampleInput)).toEqual(405));

test('part2', () => expect(part2(exampleInput)).toEqual(400));

describe('findHorizontalMirrorLine', () => {
  test('example0', () => expect(findHorizontalMirrorLine(example0)).toEqual(0));

  test('example1', () => expect(findHorizontalMirrorLine(example1)).toEqual(4));

  test('hardExample0', () =>
    expect(findHorizontalMirrorLine(hardExample0)).toEqual(0));
});

describe('findVerticalMirrorLine', () => {
  test('example0', () => expect(findVerticalMirrorLine(example0)).toEqual(5));

  test('example1', () => expect(findVerticalMirrorLine(example1)).toEqual(0));

  test('hardExample0', () =>
    expect(findVerticalMirrorLine(hardExample0)).toEqual(14));
});

describe('findHorizontalMirrorLineWithSmudge', () => {
  test('example0', () =>
    expect(findHorizontalMirrorLineWithSmudge(example0)).toEqual(3));

  test('example1', () =>
    expect(findHorizontalMirrorLineWithSmudge(example1)).toEqual(1));
});

describe('findVerticalMirrorLineWithSmudge', () => {
  test('example0', () =>
    expect(findVerticalMirrorLineWithSmudge(example0)).toEqual(0));

  test('example1', () =>
    expect(findVerticalMirrorLineWithSmudge(example1)).toEqual(0));
});

const exampleInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#
`;

const [example0, example1] = exampleInput.split('\n\n');

const hardExample0 = `.#.##..##.#.####.
.##......##..##..
.#........#.#..#.
.....#......#..#.
###.#..#.###....#
#.##.##.##.##..##
#####..######..##
.##.####.##.#..#.
...#....#...#..#.
#...#..#...######
.##.#..#.##......
..##.##.##.......
###......########
`;
