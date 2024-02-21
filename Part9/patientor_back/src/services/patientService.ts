import patients from '../../data/patients';

import { PatientEntry, NonSsnPatientEntry } from '../types';

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


const addPatient = () => {
  return null;
};

export default {
  getEntries, getNonSsnPatientEntries, addPatient
};

