import { SetStateAction } from 'react';
import { Discharge } from "../../types";
import {  TextField, Typography } from '@mui/material';


interface HospitalEntryFormProps {
  discharge: Discharge;
  setDischarge: React.Dispatch<SetStateAction<Discharge>>;
}

const HospitalEntryForm = ({discharge, setDischarge}: HospitalEntryFormProps) => {
  return (
    <div>
      <Typography variant="h6" marginTop= {1}>
        Discharge
      </Typography>
      <TextField
        style={{ marginTop: 10 }}
        label="Date"
        InputLabelProps={{ shrink: true }}
        type="date"
        fullWidth 
        value={discharge.date}
        onChange={({ target }) => setDischarge({ date:target.value, criteria:discharge.criteria })}
      />
      <TextField
        style={{ marginTop: 10 }}
        label="Criteria"
        fullWidth
        value={discharge.criteria}
        onChange={({ target }) => setDischarge({ date:discharge.date, criteria:target.value })}
      />
    </div>
  );
};

export default HospitalEntryForm;