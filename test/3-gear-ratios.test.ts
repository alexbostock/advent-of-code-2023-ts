import { describe, expect, test } from 'vitest';
import { listPartNumbers } from '../src/lib/3-gear-ratios.js';

describe('listPartNumbers', () => {
  test('identifies part numbers adjacent to symbols', () => {
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

    const partNumbers = listPartNumbers(schematic);

    const expected = [467, 35, 633, 617, 592, 755, 664, 598];

    expect(partNumbers).toEqual(expected);
  });
});
