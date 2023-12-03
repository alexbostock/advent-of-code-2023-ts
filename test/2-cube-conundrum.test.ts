import { describe, expect, test } from 'vitest';
import {
  gameId,
  isPossible,
  minimumSetOfCubes,
  parseGame,
  parseSetOfCubes,
  type SetOfCubes,
} from '../src/lib/2-cube-conundrum.js';

describe('parseGame', () => {
  const testCases: [string, SetOfCubes[]][] = [
    [
      'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      [
        { blue: 3, red: 4, green: 0 },
        { red: 1, green: 2, blue: 6 },
        { green: 2, red: 0, blue: 0 },
      ],
    ],
    [
      'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      [
        {
          blue: 1,
          green: 2,
          red: 0,
        },
        {
          green: 3,
          blue: 4,
          red: 1,
        },
        {
          green: 1,
          blue: 1,
          red: 0,
        },
      ],
    ],
  ];

  test.each(testCases)('%s', (gameSerialised, expected) => {
    expect(parseGame(gameSerialised)).toEqual(expected);
  });
});

describe('parseSetOfCubes', () => {
  const testCases: [string, SetOfCubes][] = [
    ['8 green, 6 blue, 20 red', { red: 20, green: 8, blue: 6 }],
    ['5 blue, 4 red, 13 green', { red: 4, green: 13, blue: 5 }],
    ['5 green, 1 red', { red: 1, green: 5, blue: 0 }],
  ];

  test.each(testCases)('%s', (cubesSerialised, expected) => {
    expect(parseSetOfCubes(cubesSerialised)).toEqual(expected);
  });
});

describe('minimumSetOfCubes', () => {
  const testCases: [SetOfCubes[], SetOfCubes][] = [
    [[], { red: 0, green: 0, blue: 0 }],
    [[{ red: 1, green: 2, blue: 3 }], { red: 1, green: 2, blue: 3 }],
    [
      [
        { red: 1, green: 4, blue: 2 },
        { red: 3, green: 3, blue: 3 },
      ],
      { red: 3, green: 4, blue: 3 },
    ],
  ];

  test.each(testCases)('%j', (game, expected) => {
    expect(minimumSetOfCubes(game)).toEqual(expected);
  });
});

describe('isPossible', () => {
  const testCases: [string, boolean][] = [
    ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', true],
    ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', true],
    [
      'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      false,
    ],
    [
      'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      false,
    ],
    ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', true],
  ];

  const availableCubes = {
    red: 12,
    green: 13,
    blue: 14,
  };

  test.each(testCases)('%s', (game, expected) => {
    expect(isPossible(game, availableCubes)).toBe(expected);
  });
});

describe('gameId', () => {
  test('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red', () => {
    expect(gameId('Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red')).toBe(2);
  });
});
