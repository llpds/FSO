// CLI: npm run calculateExercises 2 3 0 2 4.5 0 3 1

// input: daily time by days: [3, 0, 2, 4.5, 0, 3, 1] and target value: 2
// output: 
//   { periodLength: 7,              the number of days
//     trainingDays: 5,              the number of training days
//     success: false,               boolean, was the goal achieved
//     rating: 2,                    range (1,3), how well the hours are met
//     ratingDescription: 'not too bad but could be better',   string, expain rating
//     target: 2,                    the original target value
//     average: 1.9285714285714286   the calculated average time
//   }

import { calculateExercises } from "./exerciseCalculator";

interface CliDataEx {
  target: number
  daysExrcs: Array<number>
}

const parseArgsEx = (args: string[]): CliDataEx => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const data = args.slice(2).map(el => {
    if(isNaN(Number(el))) throw new Error('Provided values were not numbers!');
    return Number(el);
  });

  const [target, ...daysExrcs] = data;
  return { target, daysExrcs };
};

try {
  const { target, daysExrcs } = parseArgsEx(process.argv);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  console.log(calculateExercises(target, daysExrcs));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}