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


interface Output {
  periodLength: number;
  trainingDays: number;
  target: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  average: number;
}

interface CliDataEx {
  target: number
  daysExrcs: Array<number>
}

const parseArgsEx = (args: string[]): CliDataEx => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const data = args.slice(2).map(el => {
    if(isNaN(Number(el))) throw new Error('Provided values were not numbers!')
    return Number(el)
  })

  const [target, ...daysExrcs] = data
  return { target, daysExrcs }
}


const isValidDuration = (number: number): void => {
  if(number <= 0 ) throw new Error('the target value should be non-zero');
  if(number > 18 ) throw new Error('Oho..., leave yourself at least 6 hours to eat and sleep');
}


const calculateExercises = ( target: number, days: Array<number>): Output => {
  isValidDuration(target)
  days.map(d=> d == 0 ? 0 : isValidDuration(d))
 
  const result = {
    periodLength: 0,
    trainingDays: 0,
    success: false,
    rating: 0,
    ratingDescription: '',
    target,
    average:0
  }

  result.periodLength = days.length;
  if(result.periodLength < 1) throw new Error('0 days is not a period');

  result.trainingDays = days.filter(d=> d!==0).length;
  result.average = days.reduce(( acc, num ) => acc + num, 0) / result.periodLength
  const rate = (result.average - target)/ target * 100
  
  if(rate > -3) {
    result.ratingDescription = 'perfect or maybe better'
    result.success = true
    result.rating = 3
  } else if(rate > -5) {
    result.ratingDescription = 'not too bad but could be better'
    result.rating = 2
  } else if(rate > -10) {
    result.ratingDescription = 'usually'
    result.rating = 1}
  else {result.ratingDescription = 'not enough'}

  return result
}


try {
  const { target, daysExrcs } = parseArgsEx(process.argv)
  console.log(calculateExercises(target, daysExrcs))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}