import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { Patient, NonSsnPatient, NewPatient, NewEntry } from '../types';

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSsnPatientEntries = ():NonSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatientEntryById = (id:string):Patient | undefined => {
  return patients.find(p => p.id === id);
};


const addPatient = (entry:NewPatient):Patient => {
  const newPatient = {
    id: uuidv4(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};
const addEntry = (id:string, entry: NewEntry):Patient | undefined => {
  const newEntry = {
    id: uuidv4(),
    ...entry
  };
  const patient: Patient | undefined = patients.find(p => p.id === id);
  patient?.entries.push(newEntry);
  return patient;
};

export default {
  getEntries, getNonSsnPatientEntries, getPatientEntryById, addPatient, addEntry
};

