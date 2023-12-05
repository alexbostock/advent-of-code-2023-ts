import { open } from 'node:fs/promises';

export type Mapping = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}[];

export async function part1() {
  const inputfile = await open('input/5-seed-fertiliser.txt');
  const [seedsSerialised, ...mappingsSerialised] = (
    await inputfile.readFile('utf8')
  ).split('\n\n');
  const seeds = parseSeedsList(seedsSerialised);
  const mappings = mappingsSerialised.map(serialised =>
    parseMapping(serialised),
  );

  let minLocation = Infinity;
  for (const location of applyAllMappings(seeds, mappings)) {
    minLocation = Math.min(location, minLocation);
  }
  console.log(minLocation);
}

export async function part2() {
  const inputFile = await open('input/5-seed-fertiliser.txt');
  const [seedsSerialised, ...mappingsSerialised] = (
    await inputFile.readFile('utf8')
  ).split('\n\n');
  const seeds = parseSeedsRanges(seedsSerialised);
  const mappings = mappingsSerialised.map(serialised =>
    parseMapping(serialised),
  );

  let minLocation = Infinity;
  for (const location of applyAllMappings(seeds, mappings)) {
    minLocation = Math.min(location, minLocation);
  }
  console.log(minLocation);
}

export function* applyAllMappings(
  seeds: Iterable<number>,
  mappings: Mapping[],
): Generator<number> {
  for (const seed of seeds) {
    yield mappings.reduce((source, mapping) => mapValue(source, mapping), seed);
  }
}

export function mapValue(source: number, mapping: Mapping): number {
  for (const {
    destinationRangeStart,
    sourceRangeStart,
    rangeLength,
  } of mapping) {
    const inRange =
      source >= sourceRangeStart && source < sourceRangeStart + rangeLength;
    if (inRange) {
      const diff = source - sourceRangeStart;
      return destinationRangeStart + diff;
    }
  }
  return source;
}

export function parseMapping(serialised: string): Mapping {
  const lines = serialised.split('\n').slice(1);

  return lines
    .map(line => line.split(' '))
    .map(([dest, source, length]) => ({
      destinationRangeStart: parseInt(dest),
      sourceRangeStart: parseInt(source),
      rangeLength: parseInt(length),
    }));
}

export function parseSeedsList(serialised: string): number[] {
  const [, content] = serialised.split(': ');
  return content.split(' ').map(num => parseInt(num));
}

export function* parseSeedsRanges(serialised: string): Generator<number> {
  const result: number[] = [];

  const [, content] = serialised.split(': ');
  const nums = content.split(' ').map(num => parseInt(num));

  for (let i = 0; i < nums.length; i += 2) {
    const rangeStart = nums[i];
    const rangeLength = nums[i + 1];
    for (let j = rangeStart; j < rangeStart + rangeLength; j++) {
      yield j;
    }
  }

  return result;
}
