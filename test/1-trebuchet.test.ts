import { describe, expect, test } from 'vitest';
import {
  getCalibrationValue,
  getCalibrationValuePart1,
} from '../src/lib/1-trebuchet';

describe('part 1 (numeric digits)', () => {
  const testCases: [string, number][] = [
    ['1abc2', 12],
    ['pqr3stu8vwx', 38],
    ['a1b2c3d4e5f', 15],
    ['treb7uchet', 77],
    ['4plvb', 44],
  ];
  test.each(testCases)('%s => %i', (line, expected) => {
    expect(getCalibrationValuePart1(line)).toBe(expected);
  });
});

describe('part 2 (digits written as words)', () => {
  const testCases: [string, number][] = [
    ['two1nine', 29],
    ['eightwothree', 83],
    ['abcone2threexyz', 13],
    ['xtwone3four', 24],
    ['4nineeightseven2', 42],
    ['zoneight234', 14],
    ['7pqrstsixteen', 76],
  ];

  test.each(testCases)('%s => %i', (line, expected) => {
    expect(getCalibrationValue(line)).toBe(expected);
  });
});

describe('awkward examples with overlapping digits', () => {
  const testCases: [string, number][] = [['98oneight', 98]];

  test.each(testCases)('%s => %i', (line, expected) => {
    expect(getCalibrationValue(line)).toBe(expected);
  });
});
