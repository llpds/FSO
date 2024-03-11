
import { useState, useEffect } from "react";
import { Patient, Diagnosis, Gender } from "../../types";
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import KeyIcon from '@mui/icons-material/Key';
import patientService from "../../services/patients";
import ShowEntry from "./ShowEntry";

type forState = Patient | '';

interface Props {
  diagnoses : Diagnosis[]
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<forState>('');
  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if(id) setPatient(await patientService.getById(id));
    };
      void fetchPatient();
  }, [id]);



  if(!patient) return null;
  return (
    <div className="App">
      <Typography variant="h4" marginTop= {5} marginBottom={3}>
        {patient.name} 
        {patient.gender === Gender.Male && <MaleIcon />}
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Other && <KeyIcon />}
      </Typography>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <Typography variant="h5" marginTop= {5} marginBottom={3}>
        entries
      </Typography>
        {}
        { patient.entries?.length == 0 
            ? <p>No entries</p>
            : patient.entries?.map((e) => <ShowEntry key={e.id} entry={e} diagnoses={diagnoses}/>)
        }

    </div>
  );
};

export default PatientPage;