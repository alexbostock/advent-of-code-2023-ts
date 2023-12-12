export interface Springs {
  springs: ('?' | '.' | '#')[];
  contiguousGroups: number[];
}

export function part1(input: string): number {
  return input
    .split('\n')
    .slice(0, -1)
    .map(line => numPossibleArrangementsWithCache(parseAndTrimLine(line)))
    .reduce((sum, num) => sum + num);
}

export function part2(input: string): number {
  return input
    .split('\n')
    .slice(0, -1)
    .map(line => preprocessLinePart2(line))
    .map(line => {
      numPossibleArrangementsCache = new Map<string, number>();
      return numPossibleArrangementsWithCache(parseAndTrimLine(line));
    })
    .reduce((sum, num) => sum + num);
}

export function preprocessLinePart2(line: string): string {
  const [springs, groups] = line.split(' ');

  return (
    new Array(5).fill(springs).join('?') +
    ' ' +
    new Array(5).fill(groups).join(',')
  );
}

let numPossibleArrangementsCache = new Map<string, number>();

function numPossibleArrangementsWithCache(params: Springs): number {
  const paramsSerialised = JSON.stringify(params);
  if (numPossibleArrangementsCache.has(paramsSerialised)) {
    return numPossibleArrangementsCache.get(paramsSerialised)!;
  } else {
    const result = numPossibleArrangements(params);
    numPossibleArrangementsCache.set(paramsSerialised, result);
    return result;
  }
}

export function numPossibleArrangements({
  springs,
  contiguousGroups,
}: Springs): number {
  if (springs.length === 0) {
    return contiguousGroups.length === 0 ? 1 : 0;
  }
  if (springs.length < contiguousGroups.length) {
    return 0;
  }
  if (contiguousGroups.length === 0) {
    switch (springs[0]) {
      case '#':
        return 0;
      default:
        return numPossibleArrangementsWithCache({
          springs: springs.slice(1),
          contiguousGroups,
        });
    }
  }
  const [firstGroup, ...restGroups] = contiguousGroups;
  const candidateFirstGroup = springs.slice(0, firstGroup);
  const spaceAfterCandidateFirstGroup =
    springs.length > firstGroup ? springs[firstGroup] : '.';
  const candidateIsPossible =
    candidateFirstGroup.length === firstGroup &&
    candidateFirstGroup.every(space => space !== '.') &&
    spaceAfterCandidateFirstGroup !== '#';
  switch (springs[0]) {
    case '.':
      return numPossibleArrangementsWithCache({
        springs: springs.slice(1),
        contiguousGroups,
      });
    case '#':
      return candidateIsPossible
        ? numPossibleArrangementsWithCache({
            springs: springs.slice(firstGroup + 1),
            contiguousGroups: restGroups,
          })
        : 0;
    case '?':
      return candidateIsPossible
        ? numPossibleArrangementsWithCache({
            springs: springs.slice(firstGroup + 1),
            contiguousGroups: restGroups,
          }) +
            numPossibleArrangementsWithCache({
              springs: springs.slice(1),
              contiguousGroups,
            })
        : numPossibleArrangementsWithCache({
            springs: springs.slice(1),
            contiguousGroups,
          });
  }
}

export function parseAndTrimLine(line: string): Springs {
  const [springsSerialised, contiguousGroupsSerialised] = line.split(' ');
  const springs: Springs['springs'] = springsSerialised
    .replace(/^\.+/, '')
    .replace(/\.+$/, '')
    .split('')
    .map(char => {
      if (char === '?' || char === '.' || char === '#') {
        return char;
      } else {
        throw new Error(`Invalid input: ${char}`);
      }
    });
  const contiguousGroups = contiguousGroupsSerialised
    .split(',')
    .map(num => parseInt(num));
  return { springs, contiguousGroups };
}
