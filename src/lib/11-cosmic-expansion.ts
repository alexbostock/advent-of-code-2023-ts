export interface Coords {
  x: number;
  y: number;
}

export interface Jumps {
  xJumps: number[];
  yJumps: number[];
}

export function part1(input: string): number {
  const expanded = expandCosmos(input);
  const galaxies = findGalaxies(expanded);

  let sumOfDistances = 0;
  for (const [index, galaxy1] of galaxies.entries()) {
    for (const galaxy2 of galaxies.slice(index + 1)) {
      sumOfDistances += distanceBetween(galaxy1, galaxy2);
    }
  }
  return sumOfDistances;
}

export function part2(cosmos: string, expansionFactor = 1000000): number {
  const jumps = expansionJumps(cosmos);
  const galaxies = findGalaxies(cosmos);

  let sumOfDistances = 0;
  for (const [index, galaxy1] of galaxies.entries()) {
    for (const galaxy2 of galaxies.slice(index + 1)) {
      sumOfDistances += distanceBetween(
        galaxy1,
        galaxy2,
        jumps,
        expansionFactor,
      );
    }
  }
  return sumOfDistances;
}

export function expandCosmos(input: string): string {
  const rows = input.split('\n').slice(0, -1);
  const expandedRows = rows.flatMap(row =>
    row.split('').every(square => square === '.') ? [row, row] : row,
  );
  const columns = transpose(expandedRows);
  const expandedColumns = columns.flatMap(column =>
    column.split('').every(square => square === '.')
      ? [column, column]
      : column,
  );

  return transpose(expandedColumns).concat('').join('\n');
}

function transpose(rows: string[]): string[] {
  return rows[0]
    .split('')
    .map((_, index) => rows.map(row => row[index]).join(''));
}

export function findGalaxies(input: string): Coords[] {
  const galaxies: Coords[] = [];

  for (const [y, row] of input.split('\n').slice(0, -1).entries()) {
    for (const [x, square] of row.split('').entries()) {
      if (square === '#') {
        galaxies.push({ x, y });
      }
    }
  }

  return galaxies;
}

export function distanceBetween(
  pos1: Coords,
  pos2: Coords,
  jumps?: Jumps,
  expansionFactor?: number,
): number {
  const distance = Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
  if (jumps && expansionFactor) {
    const numXJumps = jumps.xJumps.filter(
      jump =>
        (pos1.x < jump && jump < pos2.x) || (pos1.x > jump && jump > pos2.x),
    ).length;
    const numYJumps = jumps.yJumps.filter(
      jump =>
        (pos1.y < jump && jump < pos2.y) || (pos1.y > jump && jump > pos2.y),
    ).length;

    return distance + (numXJumps + numYJumps) * (expansionFactor - 1);
  } else {
    return distance;
  }
}

export function expansionJumps(cosmos: string): Jumps {
  const jumps: Jumps = { xJumps: [], yJumps: [] };

  const rows = cosmos.split('\n').slice(0, -1);
  for (const [y, row] of rows.entries()) {
    if (row.split('').every(square => square === '.')) {
      jumps.yJumps.push(y);
    }
  }

  const columns = transpose(rows);
  for (const [x, column] of columns.entries()) {
    if (column.split('').every(square => square === '.')) {
      jumps.xJumps.push(x);
    }
  }

  return jumps;
}
