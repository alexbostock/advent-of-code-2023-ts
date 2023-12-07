import { describe, expect, test } from 'vitest';
import {
  compareHands,
  handTypeWithJokers,
  part1Impl,
  part2Impl,
  type HandType,
} from '../src/lib/7-camel-cards.js';

test('part1Impl', () => expect(part1Impl(exampleInput)).toBe(6440));

test('part2Impl', () => expect(part2Impl(exampleInput)).toBe(5905));

describe('compareHands', () => {
  const testCases: [[hand1: string, hand2: string], sortOrder: number][] = [
    [['32T3K', '32T3K'], 0],
    [['32T3K', 'T55J5'], -1],
    [['T55J5', '32T3k'], 1],
    [['T55J5', 'QQQJA'], -1],
    [['KTJJT', 'KK677'], -1],
  ];

  test.each(testCases)('%j => %i', ([hand1, hand2], expectedSign) => {
    const comparison = compareHands(hand1, hand2);
    const signOfComparison =
      comparison === 0 ? 0 : comparison / Math.abs(comparison);
    expect(signOfComparison).toBe(expectedSign);
  });
});

describe('handTypeWithJokers', () => {
  const testCases: [hand: string, type: HandType][] = [
    ['32T3K', 'one-pair'],
    ['KK677', 'two-pair'],
    ['T55J5', '4-of-a-kind'],
    ['KTJJT', '4-of-a-kind'],
    ['QQQJA', '4-of-a-kind'],
  ];

  test.each(testCases)('%s => %s', (hand, expected) =>
    expect(handTypeWithJokers(hand)).toBe(expected),
  );
});

const exampleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;
