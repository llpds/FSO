import express from 'express';
import  patientService from '../services/patientService';
const router = express.Router();


router.get('/', (_req, res) => {
  res.send(patientService.getNonSsnPatientEntries());
});

router.post('/', (_req, res) => {
  res.send('new patient saved');
});

export default router;