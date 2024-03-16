import express from 'express';
import  patientService from '../services/patientService';
import {toNewPatient, toNewEntry } from '../utils';
const router = express.Router();


router.get('/', (_req, res) => {
  res.send(patientService.getNonSsnPatientEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientEntryById(req.params.id);
  if(patient){
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});


router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


router.post('/:id/entries', (req, res) => {
  try {
    const id = req.params.id;
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(id, newEntry);
    if(!updatedPatient){
      res.status(400).send({error:'no such patient id'});
    } else {
      res.json(updatedPatient);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;