import { SetStateAction } from 'react';
import { SickLeave } from '../../types';
import {  TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';

interface OccupationalEntryFormProps {
  employerName: string;
  setEmployerName: React.Dispatch<SetStateAction<string>>;
  sickLeave: SickLeave;
  setSickLeave: React.Dispatch<SetStateAction<SickLeave>>;
}

const OccupationalEntryForm = ({employerName, setEmployerName, sickLeave, setSickLeave }:OccupationalEntryFormProps) => {
  console.log('sickLeave', sickLeave);
  return (
    <div>

      <TextField
        style={{ marginTop: 10 }}
        label="Employer"
        fullWidth 
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <Typography variant="h6" marginTop= {1}>
        Sickleave
      </Typography>
      <p>if you don't need sickleave, just leave both fields blank</p>
      <i>if you filled in the date fields or one of them by mistake, just reset it: </i>
      <Button 
        variant="text"
        onClick={() => setSickLeave({ startDate:'', endDate:'' })}
      >Reset</Button>
      <TextField
        style={{ marginTop: 10 }}
        label="Start date"
        InputLabelProps={{ shrink: true }}
        type="date"
        fullWidth 
        value={sickLeave.startDate}
        onChange={({ target }) => setSickLeave({ startDate:target.value, endDate:sickLeave.endDate })}
      />
      <TextField
        style={{ marginTop: 10 }}
        label="End date"
        InputLabelProps={{ shrink: true }}
        type="date"
        fullWidth
        value={sickLeave.endDate}
        onChange={({ target }) => setSickLeave({ startDate:sickLeave.startDate, endDate:target.value })}
      />
    </div>
  );
};

export default OccupationalEntryForm;