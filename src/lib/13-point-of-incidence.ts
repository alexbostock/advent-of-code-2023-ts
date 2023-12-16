export function part1(input: string): number {
  const patterns = input.split('\n\n').filter(pattern => pattern !== '');
  const horizontalMirrorLines = patterns.map(findHorizontalMirrorLine);
  const verticalMirrorLines = patterns.map(findVerticalMirrorLine);

  for (let i = 0; i < patterns.length; i++) {
    console.log(i, horizontalMirrorLines[i], verticalMirrorLines[i]);
  }

  return (
    verticalMirrorLines.reduce((sum, num) => sum + num) +
    100 * horizontalMirrorLines.reduce((sum, num) => sum + num)
  );
}

export function part2(input: string): number {
  const patterns = input.split('\n\n').filter(pattern => pattern !== '');

  // const lines = patterns.map((pattern, index) => ({
  //   index,
  //   horizontal: findHorizontalMirrorLineWithSmudge(pattern),
  //   horizontalNoSmudge: findHorizontalMirrorLine(pattern),
  //   vertical: findVerticalMirrorLineWithSmudge(pattern),
  //   verticalNoSmudge: findVerticalMirrorLine(pattern),
  // }));
  const lines = patterns.map(pattern => {
    const horizontal = findHorizontalMirrorLineWithSmudge(pattern);
    const vertical = findVerticalMirrorLineWithSmudge(pattern);
    if (horizontal || vertical) {
      return {
        horizontal: horizontal,
        vertical: vertical,
      };
    } else {
      return {
        // horizontal: findHorizontalMirrorLine(pattern),
        // vertical: findVerticalMirrorLine(pattern),
        horizontal: 0,
        vertical: 0,
      };
    }
  });
  // console.log(lines);
  // for (let i = 0; i < lines.length; i++) {
  //   console.log(i, lines[i].horizontal, lines[i].vertical);
  // }

  const horizontalMirrorLines = lines.map(({ horizontal }) => horizontal);
  const verticalMirrorLines = lines.map(({ vertical }) => vertical);

  return (
    verticalMirrorLines.reduce((sum, num) => sum + num) +
    100 * horizontalMirrorLines.reduce((sum, num) => sum + num)
  );
}

export function findHorizontalMirrorLine(pattern: string): number {
  const rows = pattern.split('\n').filter(row => row !== '');
  for (const [candidateMirrorLine] of [...rows.entries()].slice(1)) {
    for (let i = 0; i < rows.length - 1; i++) {
      const row1 = rows[candidateMirrorLine + i];
      const row2 = rows[candidateMirrorLine - i - 1];
      if (!row1 || !row2) {
        return candidateMirrorLine;
      } else if (row1 !== row2) {
        break;
      }
    }
  }
  return 0;
}

export function findVerticalMirrorLine(pattern: string): number {
  const grid: string[][] = pattern
    .split('\n')
    .filter(row => row !== '')
    .map(row => row.split(''));
  const columns = grid[0].map((_, columnNumber) =>
    grid.map(row => row[columnNumber]).join(''),
  );

  for (const [candidateMirrorLine] of [...columns.entries()].slice(1)) {
    for (let i = 0; i < columns.length - 1; i++) {
      const column1 = columns[candidateMirrorLine + i];
      const column2 = columns[candidateMirrorLine - i - 1];
      if (!column1 || !column2) {
        return candidateMirrorLine;
      } else if (column1 !== column2) {
        break;
      }
    }
  }
  return 0;
}

export function findHorizontalMirrorLineWithSmudge(pattern: string): number {
  // console.log();
  // console.log(pattern);
  const lineWithoutSmudge = findHorizontalMirrorLine(pattern);
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '.') {
      const adjusted = pattern.slice(0, i) + '#' + pattern.slice(i + 1);
      const line = findHorizontalMirrorLine(adjusted);
      if (line && line !== lineWithoutSmudge) {
        // console.log(adjusted);
        // console.log(line);
        return line;
      }
    } else if (pattern[i] === '#') {
      const adjusted = pattern.slice(0, i) + '.' + pattern.slice(i + 1);
      const line = findHorizontalMirrorLine(adjusted);
      if (line && line !== lineWithoutSmudge) {
        // console.log(adjusted);
        // console.log(line);
        return line;
      }
    }
  }
  return lineWithoutSmudge;
}

export function findVerticalMirrorLineWithSmudge(pattern: string): number {
  // console.log();
  // console.log(pattern);
  const lineWithoutSmudge = findVerticalMirrorLine(pattern);
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '.') {
      const adjusted = pattern.slice(0, i) + '#' + pattern.slice(i + 1);
      const line = findVerticalMirrorLine(adjusted);
      if (line && line !== lineWithoutSmudge) {
        // console.log(adjusted);
        // console.log(line);
        return line;
      }
    } else if (pattern[i] === '#') {
      const adjusted = pattern.slice(0, i) + '.' + pattern.slice(i + 1);
      const line = findVerticalMirrorLine(adjusted);
      if (line && line !== lineWithoutSmudge) {
        // console.log(adjusted);
        // console.log(line);
        return line;
      }
    }
  }
  return 0;
}
