import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
const second_app = express();
second_app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if(isNaN(weight) || isNaN(height)) res.status(400).json({ error: 'height and weight must be number' });

  const bmi = calculateBmi(height, weight);
  res.json({weight, height, bmi});
});

second_app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;
  if(!daily_exercises || !target) res.status(400).json({ error: "parameters missing" });

  const isNumber = (val:number) => typeof val === 'number' && !isNaN(val);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const isArr = (val:number[]) => Array.isArray(val) && val.length > 0 && val.every((el:number) => isNumber(el));
  
  if (!isArr(daily_exercises as number[]) || !isNumber(target as number))
    res.status(400).json({ error: "malformatted parameters" });

  const result = calculateExercises(Number(target), daily_exercises as number[]);

  res.json(result);
});

const PORT = 3003;
const SECOND_PORT  = 3002;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

second_app.listen(SECOND_PORT, () => {
  console.log(`Server listening on port ${SECOND_PORT}`);
});
