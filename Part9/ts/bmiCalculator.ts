// http://localhost:3003/bmi?height=180&weight=72

const calculateBmi = (h: number, w: number ): string => {
const bmi = w / (h/100) ** 2;
if(bmi < 16) return 'Underweight (Severe thinness)';
if(bmi < 17) return 'Underweight (Moderate thinness)';
if(bmi < 18.5) return 'Underweight (Mild thinness) ';
if(bmi < 25) return 'Normal (healthy weight)';
if(bmi < 30) return 'Overweight (Pre-obese) ';
if(bmi < 35) return 'Obese (Class I) ';
if(bmi < 40) return 'Obese (Class II)';
return 'Obese (Class III) ';
};

export default calculateBmi;