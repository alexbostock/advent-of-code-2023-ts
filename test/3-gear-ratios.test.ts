import { describe, expect, test } from 'vitest';
import { listGearRatios, listPartNumbers } from '../src/lib/3-gear-ratios.js';

const schematic = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

describe('listPartNumbers', () => {
  test('identifies part numbers adjacent to symbols', () => {
    const partNumbers = listPartNumbers(schematic);

    const expected = [467, 35, 633, 617, 592, 755, 664, 598];

    expect(partNumbers).toEqual(expected);
  });
});

describe('listGearRatios', () => {
  test('identifies gear ratios from schematic', () => {
    const gearRatios = listGearRatios(schematic);

    const expected = [16345, 451490];

    expect(gearRatios).toEqual(expected);
  });
});
