import { describe, expect, test } from 'vitest';
import {
  parseInput,
  part1,
  part2,
  type WastelandMap,
} from '../src/lib/8-haunted-wasteland.js';

describe('part1', () => {
  test('example 1', () => expect(part1(exampleInput1)).toBe(2));

  test('example2', () => expect(part1(exampleInput2)).toBe(6));
});

test('part2', () => expect(part2(exampleInputPart2)).toBe(6));

describe('parseInput', () => {
  test('example 1', () => {
    const map = parseInput(exampleInput1);

    const expected: WastelandMap = {
      steps: ['R', 'L'],
      nodes: new Map([
        ['AAA', { left: 'BBB', right: 'CCC' }],
        ['BBB', { left: 'DDD', right: 'EEE' }],
        ['CCC', { left: 'ZZZ', right: 'GGG' }],
        ['DDD', { left: 'DDD', right: 'DDD' }],
        ['EEE', { left: 'EEE', right: 'EEE' }],
        ['GGG', { left: 'GGG', right: 'GGG' }],
        ['ZZZ', { left: 'ZZZ', right: 'ZZZ' }],
      ]),
    };

    expect(map).toEqual(expected);
  });

  test('example 2', () => {
    const map = parseInput(exampleInput2);

    const expected: WastelandMap = {
      steps: ['L', 'L', 'R'],
      nodes: new Map([
        ['AAA', { left: 'BBB', right: 'BBB' }],
        ['BBB', { left: 'AAA', right: 'ZZZ' }],
        ['ZZZ', { left: 'ZZZ', right: 'ZZZ' }],
      ]),
    };

    expect(map).toEqual(expected);
  });
});

const exampleInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const exampleInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

const exampleInputPart2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;
