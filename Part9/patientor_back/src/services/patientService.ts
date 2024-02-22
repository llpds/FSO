import patients from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';

import { PatientEntry, NonSsnPatientEntry, NewPatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSsnPatientEntries = ():NonSsnPatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};


const addPatient = (entry:NewPatientEntry):PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries, getNonSsnPatientEntries, addPatient
};

