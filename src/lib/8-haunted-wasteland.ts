export interface WastelandMap {
  steps: ('L' | 'R')[];
  nodes: Map<
    string,
    {
      left: string;
      right: string;
    }
  >;
}

export function part1(input: string): number {
  const map = parseInput(input);
  const stepStream = generateSteps(map);

  let currentNodeId = 'AAA';
  let numSteps = 0;

  for (numSteps = 0; currentNodeId !== 'ZZZ'; numSteps++) {
    const currentNode = map.nodes.get(currentNodeId);
    if (!currentNode) {
      throw new Error(`Cannot find current node ${currentNodeId}`);
    }
    const { value: step } = stepStream.next();
    currentNodeId = step === 'L' ? currentNode.left : currentNode.right;
  }

  return numSteps;
}

export function part2(input: string): number {
  const map = parseInput(input);

  const startNodeIds = [...map.nodes.keys()].filter(key => key.endsWith('A'));

  const paths = startNodeIds.map(id => solvePath(map, id));
  for (const path of paths) {
    if (path.stepsToFirstSolution !== path.stepsToLoop) {
      throw new Error("This solution won't work");
    }
  }

  return lcm(paths.map(path => path.stepsToLoop));
}

function solvePath(
  map: WastelandMap,
  startNode: string,
): { stepsToFirstSolution: number; stepsToLoop: number } {
  const stepStream = generateSteps(map);

  let currentNodeId = startNode;
  let numSteps = 0;
  for (numSteps = 0; !currentNodeId.endsWith('Z'); numSteps++) {
    const currentNode = map.nodes.get(currentNodeId);
    if (!currentNode) {
      throw new Error(`Cannot find current node ${currentNodeId}`);
    }
    const { value: step } = stepStream.next();
    currentNodeId = step === 'L' ? currentNode.left : currentNode.right;
  }
  const stepsToFirstSolution = numSteps;
  const firstSolutionId = currentNodeId;

  do {
    const currentNode = map.nodes.get(currentNodeId);
    if (!currentNode) {
      throw new Error(`Cannot find current node ${currentNodeId}`);
    }
    const { value: step } = stepStream.next();
    currentNodeId = step === 'L' ? currentNode.left : currentNode.right;
    numSteps++;
  } while (currentNodeId !== firstSolutionId);

  return {
    stepsToFirstSolution,
    stepsToLoop: numSteps - stepsToFirstSolution,
  };
}

export function parseInput(input: string): WastelandMap {
  const [stepsSerialised, nodesSerialised] = input.split('\n\n');
  return {
    steps: stepsSerialised.split('').map(parseStep),
    nodes: new Map(
      nodesSerialised
        .split('\n')
        .filter(val => val !== '')
        .map(nodeSerialised => {
          const [id, paths] = nodeSerialised.split(' = ');
          const [left, right] = paths.slice(1, -1).split(', ');
          return [id, { left, right }];
        }),
    ),
  };
}

function parseStep(serialised: string): 'L' | 'R' {
  if (serialised === 'L' || serialised === 'R') {
    return serialised;
  } else {
    throw new Error('Invalid input');
  }
}

function* generateSteps(map: WastelandMap): Generator<'L' | 'R'> {
  while (true) {
    for (const step of map.steps) {
      yield step;
    }
  }
}

function lcm(nums: number[]): number {
  const allPrimeFactors = nums.map(primeFactors);
  const allPrimeFactorsGrouped = allPrimeFactors.map(factors => {
    const factorsGrouped = new Map<number, number>();
    for (const factor of factors) {
      const count = factorsGrouped.get(factor) ?? 0;
      factorsGrouped.set(factor, count + 1);
    }
    return factorsGrouped;
  });

  const superSetPrimeFactors = new Map<number, number>();
  for (const group of allPrimeFactorsGrouped) {
    for (const [factor, count] of group.entries()) {
      const superSetCount = superSetPrimeFactors.get(factor) ?? 0;
      superSetPrimeFactors.set(factor, Math.max(count, superSetCount));
    }
  }

  return [...superSetPrimeFactors.entries()].reduce(
    (prod, [factor, count]) => prod * factor ** count,
    1,
  );
}

function primeFactors(num: number): number[] {
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return [i, ...primeFactors(num / i)];
    }
  }
  return [num];
}
