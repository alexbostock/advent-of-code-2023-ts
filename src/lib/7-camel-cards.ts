const orderedHandTypes = [
  'high-card',
  'one-pair',
  'two-pair',
  'three-of-a-kind',
  'full-house',
  '4-of-a-kind',
  '5-of-a-kind',
] as const;
export type HandType = (typeof orderedHandTypes)[number];

const orderedCardValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
];

export function part1(input: string) {
  const hands = input
    .split('\n')
    .filter(val => val !== '')
    .map(serialised => {
      const [hand, bid] = serialised.split(' ');
      return { hand, bid: parseInt(bid) };
    });
  hands.sort(({ hand: hand1 }, { hand: hand2 }) => compareHands(hand1, hand2));
  return hands.reduce((score, { bid }, index) => score + bid * (index + 1), 0);
}

export function part2(input: string) {
  const hands = input
    .split('\n')
    .filter(val => val !== '')
    .map(serialised => {
      const [hand, bid] = serialised.split(' ');
      return { hand, bid: parseInt(bid) };
    });
  hands.sort(({ hand: hand1 }, { hand: hand2 }) =>
    compareHands(hand1, hand2, true),
  );
  return hands.reduce((score, { bid }, index) => score + bid * (index + 1), 0);
}

export function compareHands(
  hand1: string,
  hand2: string,
  jokers?: boolean,
): number {
  const handTypeRank = (hand: string) =>
    orderedHandTypes.indexOf(
      jokers ? handTypeWithJokers(hand) : handType(hand),
    );
  const hand1TypeRank = handTypeRank(hand1);
  const hand2TypeRank = handTypeRank(hand2);
  if (hand1TypeRank !== hand2TypeRank) {
    return hand1TypeRank - hand2TypeRank;
  }

  const cardValueRank = (card: string) =>
    jokers
      ? ['J', ...orderedCardValues].indexOf(card)
      : orderedCardValues.indexOf(card);
  for (let i = 0; i < 5; i++) {
    const card1Rank = cardValueRank(hand1[i]);
    const card2Rank = cardValueRank(hand2[i]);
    if (card1Rank !== card2Rank) {
      return card1Rank - card2Rank;
    }
  }

  return 0;
}

function handType(hand: string): HandType {
  const countsByValue = new Map<string, number>();
  for (const card of hand.split('')) {
    const currentCount = countsByValue.get(card) ?? 0;
    countsByValue.set(card, currentCount + 1);
  }

  const counts = [...countsByValue.values()];
  if (counts.some(count => count === 5)) {
    return '5-of-a-kind';
  } else if (counts.some(count => count === 4)) {
    return '4-of-a-kind';
  } else if (
    counts.some(count => count === 3 && counts.some(count => count === 2))
  ) {
    return 'full-house';
  } else if (counts.some(count => count === 3)) {
    return 'three-of-a-kind';
  } else if (counts.filter(count => count === 2).length === 2) {
    return 'two-pair';
  } else if (counts.some(count => count === 2)) {
    return 'one-pair';
  } else {
    return 'high-card';
  }
}

export function handTypeWithJokers(hand: string): HandType {
  const cards = hand.split('');
  const numJokers = cards.filter(card => card === 'J').length;
  const nonJokers = cards.filter(card => card !== 'J');

  let bestHandSoFar: HandType = 'high-card';
  for (const jokerValues of possibleJokerValues(numJokers)) {
    const possibleHand = handType([...nonJokers, ...jokerValues].join(''));
    if (
      orderedHandTypes.indexOf(possibleHand) >
      orderedHandTypes.indexOf(bestHandSoFar)
    ) {
      bestHandSoFar = possibleHand;
    }
  }
  return bestHandSoFar;
}

function* possibleJokerValues(numJokers: number): Generator<string[]> {
  const nonJokerValues = orderedCardValues.filter(val => val !== 'J');
  if (numJokers === 0) {
    yield [];
  } else if (numJokers === 1) {
    for (const val of nonJokerValues) {
      yield [val];
    }
  } else {
    for (const val of nonJokerValues) {
      for (const vals of possibleJokerValues(numJokers - 1)) {
        yield [val, ...vals];
      }
    }
  }
}
