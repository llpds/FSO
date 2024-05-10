import { Entry, EntryType, Diagnosis } from "../../types";

import Hospital from './Hospital';
import Healthcare from './Healthcare';
import HealthCheck from './HealthCheck';

import { Typography } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Box from '@mui/material/Box';


interface Props {
  entry : Entry
  diagnoses: Diagnosis[]
}

const ShowEntry = ({ entry, diagnoses }: Props) => {

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails = () => {
    switch(entry.type){
      case EntryType.Hospital:
        return <Hospital discharge = {entry.discharge} />;
      case EntryType.OccupationalHealthcare:
        return <Healthcare entry = { entry }/>;
      case EntryType.HealthCheck: 
        return <HealthCheck healthCheckRating = { entry.healthCheckRating }/>;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box sx={{ marginTop: '10px', padding: '10px', border: 1, borderRadius: '5px' }}>
      {entry.date}
      {entry.type === EntryType.Hospital && <LocalHospitalIcon />}
      {entry.type === EntryType.OccupationalHealthcare && <><WorkIcon /> {entry.employerName} </>}
      {entry.type === EntryType.HealthCheck && <MedicalServicesIcon />}
      <br />
      <Typography marginTop= {1} > Description </Typography>
      <i>{entry.description}</i>
      <ul>
            {entry.diagnosisCodes?.map((c,i) => <li key={i}> {c} {c ? diagnoses.find(d => d.code === c)?.name : null} </li>)}
      </ul>
      <EntryDetails />
      <p style={{ margin: 0 }}>diagnose by {entry.specialist}</p>
    </Box>
  );
};

export default ShowEntry;