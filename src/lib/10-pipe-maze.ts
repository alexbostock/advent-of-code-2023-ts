import { type FileHandle } from 'fs/promises';

const pipeSquares: MazeSquare[] = ['|', '-', 'L', 'J', '7', 'F'];

export type MazeSquare = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.';

export interface Maze {
  pipes: MazeSquare[][];
  start: Coords;
}

interface Coords {
  x: number;
  y: number;
}

export async function part1(inputFile: FileHandle) {
  const input = await inputFile.readFile('utf8');
  await inputFile.close();
  console.log(part1Impl(input));
}

export async function part2(inputFile: FileHandle) {
  const input = await inputFile.readFile('utf8');
  await inputFile.close();
  console.log(part2Impl(input));
}

export function part1Impl(input: string): number {
  return solveMaze(parseMaze(input)).size / 2;
}

export function part2Impl(input: string): number {
  const maze = parseMaze(input);
  const positionsInPath = solveMaze(maze);
  const positionsOutsideGrid = traverseOutside(maze, positionsInPath);

  let numSquaresInside = 0;
  for (const [y, row] of maze.pipes.entries()) {
    for (const [x] of row.entries()) {
      const pos = serialisePos({ x, y });
      if (!positionsInPath.has(pos) && !positionsOutsideGrid.has(pos)) {
        numSquaresInside++;
      }
    }
  }
  return numSquaresInside;
}

export function parseMaze(input: string): Maze {
  const lines = input.split('\n').filter(val => val !== '');

  const start = findStartPosition(lines);

  const candidates: Maze[] = pipeSquares.map(startSquareCandidate => {
    const pipes: Maze['pipes'] = lines.map(row =>
      row.split('').map(square => {
        if (isValidSquare(square)) {
          return square;
        } else if (square === 'S') {
          return startSquareCandidate;
        } else {
          throw new Error('Invalid input');
        }
      }),
    );
    return {
      pipes,
      start,
    };
  });

  const maze = candidates.find(maze => hasLoop(maze));
  if (!maze) {
    throw new Error('Cannot find maze with complete cycle');
  }
  return maze;
}

export function solveMaze(maze: Maze): Set<string> {
  const positionsInPath = new Set<string>();

  let currentPos: Coords = {
    x: maze.start.x,
    y: maze.start.y,
  };
  let prevPos: Coords | undefined;
  do {
    positionsInPath.add(serialisePos(currentPos));
    const nextPos = findAdajacentPositions(maze, currentPos).find(
      pos =>
        (pos.x !== prevPos?.x || pos.y !== prevPos?.y) &&
        findAdajacentPositions(maze, pos).some(
          pos => pos.x === currentPos.x && pos.y === currentPos.y,
        ),
    );
    if (nextPos) {
      prevPos = currentPos;
      currentPos = nextPos;
    } else {
      throw new Error('No path');
    }
  } while (currentPos.x !== maze.start.x || currentPos.y !== maze.start.y);

  return positionsInPath;
}

export function hasLoop(maze: Maze): boolean {
  let currentPos: Coords = {
    x: maze.start.x,
    y: maze.start.y,
  };
  let prevPos: Coords | undefined;
  do {
    const nextPos = findAdajacentPositions(maze, currentPos).find(
      pos =>
        (pos.x !== prevPos?.x || pos.y !== prevPos?.y) &&
        findAdajacentPositions(maze, pos).some(
          pos => pos.x === currentPos.x && pos.y === currentPos.y,
        ),
    );
    if (nextPos) {
      prevPos = currentPos;
      currentPos = nextPos;
    } else {
      return false;
    }
  } while (currentPos.x !== maze.start.x || currentPos.y !== maze.start.y);

  return true;
}

function findStartPosition(lines: string[]): Coords {
  for (const [y, line] of lines.entries()) {
    for (const [x, square] of line.split('').entries()) {
      if (square === 'S') {
        return { x, y };
      }
    }
  }
  throw new Error('Start square not found');
}

function isValidSquare(square: string): square is MazeSquare {
  return pipeSquares.includes(square as MazeSquare) || square === '.';
}

function findAdajacentPositions(maze: Maze, p: Coords): Coords[] {
  const square = maze.pipes[p.y][p.x];
  switch (square) {
    case '-':
      return [
        { x: p.x - 1, y: p.y },
        { x: p.x + 1, y: p.y },
      ].filter(pos => withinBounds(maze, pos));
    case '|':
      return [
        { x: p.x, y: p.y - 1 },
        { x: p.x, y: p.y + 1 },
      ].filter(pos => withinBounds(maze, pos));
    case '7':
      return [
        { x: p.x - 1, y: p.y },
        { x: p.x, y: p.y + 1 },
      ].filter(pos => withinBounds(maze, pos));
    case 'F':
      return [
        { x: p.x + 1, y: p.y },
        { x: p.x, y: p.y + 1 },
      ].filter(pos => withinBounds(maze, pos));
    case 'J':
      return [
        { x: p.x - 1, y: p.y },
        { x: p.x, y: p.y - 1 },
      ].filter(pos => withinBounds(maze, pos));
    case 'L':
      return [
        { x: p.x + 1, y: p.y },
        { x: p.x, y: p.y - 1 },
      ].filter(pos => withinBounds(maze, pos));
    case '.':
      return [];
  }
}

function withinBounds(maze: Maze, position: Coords): boolean {
  return (
    position.x >= 0 &&
    position.x < maze.pipes[0].length &&
    position.y >= 0 &&
    position.y < maze.pipes.length
  );
}

function serialisePos(pos: Coords) {
  return `${pos.x}:${pos.y}`;
}

function traverseOutside(maze: Maze, positionsInPath: Set<string>) {
  const xMin = -0.5;
  const yMin = -0.5;
  const xMax = maze.pipes[0].length - 0.5;
  const yMax = maze.pipes.length - 0.5;
  const visitedPositions = new Set<string>();
  const frontierQueue: Coords[] = [{ x: xMax, y: yMax }];

  function getPoint(x: number, y: number) {
    if (x < 0 || x >= xMax || y < 0 || y >= yMax) {
      return '.';
    }
    return maze.pipes[y][x];
  }
  while (frontierQueue.length > 0) {
    const pos = frontierQueue.shift();
    if (!pos) {
      throw new Error('Unexpected: queue empty');
    }
    if (visitedPositions.has(serialisePos(pos))) {
      continue;
    }
    visitedPositions.add(serialisePos(pos));
    for (const xNeighbour of [pos.x - 0.5, pos.x, pos.x + 0.5]) {
      if (xNeighbour < xMin || xNeighbour > xMax) {
        continue;
      }
      for (const yNeighbour of [pos.y - 0.5, pos.y, pos.y + 0.5]) {
        if (yNeighbour < yMin || yNeighbour > yMax) {
          continue;
        }
        if (xNeighbour !== pos.x && yNeighbour !== pos.y) {
          continue;
        }
        const neighbour = { x: xNeighbour, y: yNeighbour };
        if (visitedPositions.has(serialisePos(neighbour))) {
          continue;
        }
        if (xNeighbour % 1 === 0.5 && yNeighbour % 1 === 0.5) {
          frontierQueue.push(neighbour);
        } else if (xNeighbour % 1 === 0.5) {
          const adjacentLeftPos = { x: xNeighbour - 0.5, y: yNeighbour };
          const adjacentRightPos = { x: xNeighbour + 0.5, y: yNeighbour };
          const adjacentLeft = getPoint(adjacentLeftPos.x, adjacentLeftPos.y);
          const adjacentRight = getPoint(
            adjacentRightPos.x,
            adjacentRightPos.y,
          );
          const spaceBetweenAdjacents =
            !positionsInPath.has(serialisePos(adjacentLeftPos)) ||
            !positionsInPath.has(serialisePos(adjacentRightPos)) ||
            (['|', 'J', '7', '.'].includes(adjacentLeft) &&
              ['|', 'F', 'L', '.'].includes(adjacentRight));
          if (spaceBetweenAdjacents) {
            frontierQueue.push(neighbour);
          }
        } else if (yNeighbour % 1 === 0.5) {
          const adjacentAbovePos = { x: xNeighbour, y: yNeighbour - 0.5 };
          const adjacentBelowPos = { x: xNeighbour, y: yNeighbour + 0.5 };
          const adjacentAbove = getPoint(
            adjacentAbovePos.x,
            adjacentAbovePos.y,
          );
          const adjacentBelow = getPoint(
            adjacentBelowPos.x,
            adjacentBelowPos.y,
          );
          const spaceBetweenAdjacents =
            !positionsInPath.has(serialisePos(adjacentAbovePos)) ||
            !positionsInPath.has(serialisePos(adjacentBelowPos)) ||
            (['-', 'J', 'L', '.'].includes(adjacentAbove) &&
              ['-', 'F', '7', '.'].includes(adjacentBelow));
          if (spaceBetweenAdjacents) {
            frontierQueue.push(neighbour);
          }
        } else {
          if (
            !positionsInPath.has(serialisePos({ x: xNeighbour, y: yNeighbour }))
          ) {
            frontierQueue.push(neighbour);
          }
        }
      }
    }
  }
  return visitedPositions;
}
