import { describe, expect, test } from 'vitest';
import {
  Mapping,
  applyAllMappings,
  mapValue,
  parseMapping,
  parseSeedsList,
  parseSeedsRanges,
} from '../src/lib/5-seed-fertiliser.js';

test('applyAllMappings', () => {
  const mappings = [
    `seed-to-soil map:
50 98 2
52 50 48`,
    `soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15`,
    `fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4`,
    `water-to-light map:
88 18 7
18 25 70`,
    `light-to-temperature map:
45 77 23
81 45 19
68 64 13`,
    `temperature-to-humidity map:
0 69 1
1 0 69`,
    `humidity-to-location map:
60 56 37
56 93 4`,
  ].map(serialised => parseMapping(serialised));

  const seeds = parseSeedsList('seeds: 79 14 55 13');

  const locations = [...applyAllMappings(seeds, mappings)];

  expect(locations).toEqual([82, 43, 86, 35]);
});

describe('mapValue', () => {
  const mapping: Mapping = [
    {
      destinationRangeStart: 50,
      sourceRangeStart: 98,
      rangeLength: 2,
    },
    {
      destinationRangeStart: 52,
      sourceRangeStart: 50,
      rangeLength: 48,
    },
  ];
  const testCases: [[number, Mapping], number][] = [
    [[79, mapping], 81],
    [[14, mapping], 14],
    [[55, mapping], 57],
    [[13, mapping], 13],
  ];

  test.each(testCases)('%j', ([val, mapping], expected) => {
    expect(mapValue(val, mapping)).toEqual(expected);
  });
});

test('parseMapping', () => {
  const serialised = `soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15`;

  const expected: Mapping = [
    {
      destinationRangeStart: 0,
      sourceRangeStart: 15,
      rangeLength: 37,
    },
    {
      destinationRangeStart: 37,
      sourceRangeStart: 52,
      rangeLength: 2,
    },
    {
      destinationRangeStart: 39,
      sourceRangeStart: 0,
      rangeLength: 15,
    },
  ];

  expect(parseMapping(serialised)).toEqual(expected);
});

test('parseSeedsList', () => {
  expect(parseSeedsList('seeds: 79 14 55 13')).toEqual([79, 14, 55, 13]);
});

test('parseSeedsRanges', () => {
  const seeds = [...parseSeedsRanges('seeds: 79 14 55 13')];
  expect(seeds).toEqual([
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67,
  ]);
});
