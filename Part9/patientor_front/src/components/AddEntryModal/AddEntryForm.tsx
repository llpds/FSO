import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { PatientFormValues, Diagnosis, HealthCheckRating, EntryType, NewBaseEntry } from "../../types";

interface Props {
  diagnoses : readonly Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
}

interface RatingsOption{
  value: HealthCheckRating;
  label: string;
}

const ratingsOptions: RatingsOption[] = [];
Object.values(HealthCheckRating).forEach(v => {if(typeof v === 'number') ratingsOptions.push({value: v, label:v.toString()}); });


const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [type, setType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [diagnosesCodes, setDiagnosesCodes] = useState<string[] | never[]>([]);


  const diagnosesOption:string[] = diagnoses.map(d=> d.code);

  const onHealthCheckRatingChange = (e: SelectChangeEvent<string>)=>{
    e.preventDefault();
    if ( typeof e.target.value === "number") {
      const value = e.target.value;
      const rating = Object.values(HealthCheckRating).find(g => g === value);
      console.log('rating', typeof rating);
      if (typeof rating === 'number') {
        setHealthCheckRating(rating);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const newBaseEntry:NewBaseEntry = {date, specialist, description};
    if(diagnosesCodes.length > 0) newBaseEntry.diagnosisCodes = diagnosesCodes;
    switch(type){
      case EntryType.HealthCheck:
        onSubmit ({...newBaseEntry, healthCheckRating, type: type});
        break;
      default:
        console.log('newer');
      }

      setType(EntryType.HealthCheck);
      setDescription('');
      setDate('');
      setSpecialist('');
      setHealthCheckRating(HealthCheckRating.Healthy);
      setDiagnosesCodes([]);
  };

  return (
    <div>
      <form onSubmit={addEntry} >
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <Autocomplete
          style={{ marginTop: 10 }}
          multiple
          value={diagnosesCodes}
          onChange={(_event, values) => {
            setDiagnosesCodes(values);
          }}
          id="tags-outlined"
          options={diagnosesOption}
          renderInput={(params) => <TextField {...params} label="Diagnoses code"/>}
        />

        <InputLabel style={{ marginTop: 20 }}>HealthCheckRating</InputLabel>
        <Select
          label="HealthCheckRating"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={onHealthCheckRatingChange}
        >
        {ratingsOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;