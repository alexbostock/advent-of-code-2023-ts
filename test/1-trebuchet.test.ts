import { describe, expect, test } from 'vitest';
import { getCalibrationValue } from '../src/lib/1-trebuchet';

describe('examples provided', () => {
  const testCases: [string, number][] = [
    ['1abc2', 12],
    ['pqr3stu8vwx', 38],
    ['a1b2c3d4e5f', 15],
    ['treb7uchet', 77],
  ];
  test.each(testCases)('%s => %i', (line, expected) => {
    expect(getCalibrationValue(line)).toBe(expected);
  });
});
