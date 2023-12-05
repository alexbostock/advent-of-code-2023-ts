import { open } from 'node:fs/promises';

interface CardHolding {
  card: string;
  numHeld: number;
}

export async function part1() {
  const inputFile = await open('input/4-scratchcards.txt');

  let sum = 0;

  for await (const line of inputFile.readLines()) {
    sum += scoreScratchCard(line);
  }

  console.log(sum);
}

export async function part2() {
  const inputFile = await open('input/4-scratchcards.txt');
  const cardsSerialised = await inputFile.readFile('utf8');
  const cards = cardsSerialised.split('\n').filter(line => line !== '');

  console.log(countScratchCardsAfterWinnings(cards));
}

export function countScratchCardsAfterWinnings(cards: string[]): number {
  const holdings: CardHolding[] = cards.map(card => ({ card, numHeld: 1 }));

  for (let i = 0; i < holdings.length; i++) {
    const numMatches = countMatches(holdings[i].card);

    for (let j = i + 1; j < i + 1 + numMatches; j++) {
      holdings[j].numHeld += holdings[i].numHeld;
    }
  }

  return holdings.reduce((sum, holding) => sum + holding.numHeld, 0);
}

export function scoreScratchCard(card: string): number {
  const numMatches = countMatches(card);

  return numMatches === 0 ? 0 : 2 ** (numMatches - 1);
}

function countMatches(card: string): number {
  const [, content] = card.split(': ');
  const [winningNumbersSerialised, myNumbersSerialised] = content.split(' | ');

  const winningNumbers = new Set(parseListOfNumbers(winningNumbersSerialised));
  const myNumbers = parseListOfNumbers(myNumbersSerialised);

  const matches = myNumbers.filter(num => winningNumbers.has(num));

  return matches.length;
}

function parseListOfNumbers(serialised: string): number[] {
  return serialised
    .split(' ')
    .filter(val => val !== '')
    .map(num => parseInt(num));
}
