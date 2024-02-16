// http://localhost:3002/exercises

// input
// {
//   "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
//   "target": 2.5
// }

interface ExOutput {
  periodLength: number;
  trainingDays: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  average: number;
}

const isValidDuration = (number: number): void => {
  if(number <= 0 ) throw new Error('the target value should be non-zero!');
  if(number > 18 ) throw new Error('Oho..., leave yourself at least 6 hours to eat and sleep');
};


export const calculateExercises = ( target: number, daily_exercises: Array<number>): ExOutput => {
  isValidDuration(target);
  daily_exercises.map(d=> {
    d == 0 ? 0 : isValidDuration(d);
    // console.log('d', d);
  });
 
  const result = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target,
    average:0
  };

  result.periodLength = daily_exercises.length;
  if(result.periodLength < 1) throw new Error('0 days is not a period');

  result.trainingDays = daily_exercises.filter(d=> d!==0).length;
  result.average = daily_exercises.reduce(( acc, num ) => acc + num, 0) / result.periodLength;
  const rate = (result.average - target)/ target * 100;
  
  if(rate > -3) {
    result.ratingDescription = 'perfect or maybe better';
    result.success = true;
    result.rating = 3;
  } else if(rate > -5) {
    result.ratingDescription = 'not too bad but could be better';
    result.rating = 2;
  } else if(rate > -10) {
    result.ratingDescription = 'usually';
    result.rating = 1;}
  else {result.ratingDescription = 'bad';}

  return result;
};