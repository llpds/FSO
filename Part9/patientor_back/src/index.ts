import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import cors from'cors';
const app = express();
app.use(express.json());
app.use(cors());

const PORT= 3001;

app.get('/api/ping/', (_req, res) => {
  console.log('ping');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
  console.log(`server running on post ${PORT}`);
}); 