import { Typography } from '@mui/material';
import { OccupationalHealthcareEntry } from "../../types";

interface HelathcareDescriptionProps{
  entry: OccupationalHealthcareEntry
}

const Helathcare = ({ entry }: HelathcareDescriptionProps) => {
  return (
    <div>
      {entry.sickLeave 
        &&<div>
          <Typography> Sickleave </Typography>
          <p>Start: {entry.sickLeave.startDate}</p>
          <p>End: {entry.sickLeave.endDate}</p>
        </div>
      }
    </div>
  );
};

export default Helathcare;