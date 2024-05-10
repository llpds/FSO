
import { useState, useEffect } from "react";
import { Patient, Gender, NewEntry } from "../../types";
import { useParams } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import AddEntryModal from "../AddEntryModal";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import KeyIcon from '@mui/icons-material/Key';
import patientService from "../../services/patients";
import ShowEntry from "./ShowEntry";
import { useAppSelector } from "../../store";
import axios from 'axios';

type forState = Patient | '';

const PatientPage = () => {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [patient, setPatient] = useState<forState>('');
  const id = useParams().id;
 
  const diagnoses = useAppSelector(state => state.diagnoses);

  useEffect(() => {
    const fetchPatient = async () => {
      if(id) setPatient(await patientService.getById(id));
    };
      void fetchPatient();
  }, [id]);

  
  if(!patient || !id) return null;

  const submitNewEntry = async (data: NewEntry) => {
    try {
      const updatedPatient = await patientService.createEntry(id, data);
      setPatient(updatedPatient);
      setInputOpen(false);
      setError('');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const openInput = (): void => setInputOpen(true);

  const closeInput = (): void => {
    setInputOpen(false);
    setError('');
  };

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
      {inputOpen
        ? <AddEntryModal
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeInput}
          />
        : <Button variant="contained" onClick={() => openInput()}>
            Add New Entry
          </Button>
      }
      
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