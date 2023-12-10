import { describe, expect, test } from 'vitest';
import {
  hasLoop,
  parseMaze,
  part1Impl,
  part2Impl,
  solveMaze,
  type Maze,
} from '../src/lib/10-pipe-maze.js';

test('part1', () => expect(part1Impl(exampleInput)).toBe(4));

describe('part2', () => {
  const testCases: [string, number][] = [
    [
      `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`,
      4,
    ],
    [
      `..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`,
      4,
    ],
    [
      `.S7
FJ|
L7|
.LJ
`,
      0,
    ],
    [
      `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`,
      8,
    ],
    [
      `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`,
      10,
    ],
  ];

  test.each(testCases)('%#. %j => %i', (input, expected) =>
    expect(part2Impl(input)).toBe(expected),
  );
});

describe('parseMaze', () => {
  test('Example simplified', () =>
    expect(parseMaze(exampleInputSimplified)).toEqual(
      exampleInputSimplifiedParsed,
    ));

  test('Example', () =>
    expect(parseMaze(exampleInput)).toEqual(exampleInputParsed));
});

test('solveMaze', () => expect(solveMaze(exampleInputParsed).size).toBe(8));

describe('hasLoop', () => {
  const testCases: [Maze, boolean][] = [
    [exampleInputParsed, true],
    [
      {
        pipes: [
          ['F', '7'],
          ['L', 'J'],
        ],
        start: { x: 1, y: 0 },
      },
      true,
    ],
    [
      {
        pipes: [
          ['7', '7'],
          ['L', 'J'],
        ],
        start: { x: 0, y: 0 },
      },
      false,
    ],
    [
      {
        pipes: [
          ['F', '7'],
          ['L', 'L'],
        ],
        start: { x: 0, y: 0 },
      },
      false,
    ],
  ];

  test.each(testCases)('%j => %s', (maze, expected) =>
    expect(hasLoop(maze)).toBe(expected),
  );
});

const exampleInput = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF
`;

const exampleInputParsed: Maze = {
  pipes: [
    ['-', 'L', '|', 'F', '7'],
    ['7', 'F', '-', '7', '|'],
    ['L', '|', '7', '|', '|'],
    ['-', 'L', '-', 'J', '|'],
    ['L', '|', '-', 'J', 'F'],
  ],
  start: { x: 1, y: 1 },
};

const exampleInputSimplified = `.....
.S-7.
.|.|.
.L-J.
.....
`;

const exampleInputSimplifiedParsed: Maze = {
  pipes: [
    ['.', '.', '.', '.', '.'],
    ['.', 'F', '-', '7', '.'],
    ['.', '|', '.', '|', '.'],
    ['.', 'L', '-', 'J', '.'],
    ['.', '.', '.', '.', '.'],
  ],
  start: { x: 1, y: 1 },
};
