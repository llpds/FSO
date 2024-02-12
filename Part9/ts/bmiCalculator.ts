// CLI: npm run calculateBmi 180 74

interface CliDataBmi {
  height: number
  weight: number
}

const parseArgsBmi = (args: string[]): CliDataBmi => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateBmi = (h: number, w: number ): string => {
const bmi = w / (h/100) ** 2
console.log('bmi', bmi) 
if(bmi < 16) return 'Underweight (Severe thinness)'
if(bmi < 17) return 'Underweight (Moderate thinness)'
if(bmi < 18.5) return 'Underweight (Mild thinness) '
if(bmi < 25) return 'Normal (healthy weight)'
if(bmi < 30) return 'Overweight (Pre-obese) '
if(bmi < 35) return 'Obese (Class I) '
if(bmi < 40) return 'Obese (Class II)'
return 'Obese (Class III) '
}

try {
  const { height, weight } = parseArgsBmi(process.argv)
  console.log(calculateBmi(height, weight))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}