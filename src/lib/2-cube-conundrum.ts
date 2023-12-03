export interface SetOfCubes {
  red: number;
  green: number;
  blue: number;
}

export function isPossible(serialisedGame: string, availableCubes: SetOfCubes) {
  const game = parseGame(serialisedGame);
  const minCubes = minimumSetOfCubes(game);

  return (
    availableCubes.red >= minCubes.red &&
    availableCubes.green >= minCubes.green &&
    availableCubes.blue >= minCubes.blue
  );
}

export function parseGame(serialisedGame: string): SetOfCubes[] {
  const [, content] = serialisedGame.split(': ');
  const clauses = content.split('; ');
  return clauses.map(parseSetOfCubes);
}

export function parseSetOfCubes(serialised: string): SetOfCubes {
  const clauses = serialised.split(', ');
  const result: SetOfCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };
  for (const clause of clauses) {
    const [number, colour] = clause.split(' ');
    switch (colour) {
      case 'red':
        result.red += parseInt(number);
        break;
      case 'blue':
        result.blue += parseInt(number);
        break;
      case 'green':
        result.green += parseInt(number);
        break;
      default:
        throw new Error(`Unexpected colour ${colour}`);
    }
  }
  return result;
}

export function minimumSetOfCubes(game: SetOfCubes[]): SetOfCubes {
  const minimumSet: SetOfCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  for (const cubes of game) {
    minimumSet.red = Math.max(minimumSet.red, cubes.red);
    minimumSet.green = Math.max(minimumSet.green, cubes.green);
    minimumSet.blue = Math.max(minimumSet.blue, cubes.blue);
  }

  return minimumSet;
}

export function gameId(gameSerialised: string) {
  const [prefix] = gameSerialised.split(':');
  return parseInt(prefix.slice(5));
}
