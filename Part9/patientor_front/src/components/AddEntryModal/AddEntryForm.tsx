import { useState, SyntheticEvent } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';
import Divider from '@mui/material/Divider';

import Autocomplete from '@mui/material/Autocomplete';
import { useAppSelector } from "../../store";
import { HealthCheckRating, EntryType, NewBaseEntry, NewEntry, Discharge, SickLeave } from "../../types";
import HealthCheckRatingForm from "./HealthCheckRatingForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}


interface TypeOption{
  value: EntryType;
  label: string;
}

const typeOptions: TypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

const AddEntryForm = ({onSubmit, onCancel }: Props) => {
  const now = new Date().toJSON().slice(0, 10);
  const [type, setType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(now);
  const [specialist, setSpecialist] = useState('');
  const [diagnosesCodes, setDiagnosesCodes] = useState<string[] | never[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [discharge, setDischarge] = useState<Discharge>({date:now, criteria:''});
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState<SickLeave>({startDate:'', endDate:''});

  const diagnoses = useAppSelector(state => state.diagnoses);


  const diagnosesOption:string[] = diagnoses.map(d=> d.code);

  const onTypeChange = (e: SelectChangeEvent<string>)=>{
    e.preventDefault();
    if ( typeof e.target.value === "string") {
      const value = e.target.value;
      const type = Object.values(EntryType).find(t => t.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onHealthCheckRatingChange = (e: SelectChangeEvent<string>)=>{
    e.preventDefault();
    if ( typeof e.target.value === "number") {
      const value = e.target.value;
      const rating = Object.values(HealthCheckRating).find(g => g === value);
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
        onSubmit({...newBaseEntry, healthCheckRating, type: type});
        break;
      case EntryType.Hospital:
        onSubmit({...newBaseEntry, discharge, type: type});
        break;
      case EntryType.OccupationalHealthcare:
        if(sickLeave.startDate === ''  && sickLeave.endDate === ''){
          onSubmit({...newBaseEntry, employerName, type: type});
        }else{
          onSubmit({...newBaseEntry, employerName, sickLeave, type: type});
        }
        break;
      default:
        console.log('newer');
      }
  };

  return (
    <FormControl fullWidth>    
     <TextField
        label="Description"
        fullWidth 
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <TextField
        style={{ marginTop: 10 }}
        label="Date"
        InputLabelProps={{ shrink: true }}
        InputProps={{inputProps: { min: now } }}
        type="date"
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
     <Divider style={{ marginTop: 10, marginBottom: 2}} />
     <FormControl>
        <InputLabel style={{ marginTop: 10 }} id="entryType"> Entry Type: </InputLabel>
        <Select
          style={{ marginTop: 10 }}
          labelId="entryType"
          label = "Entry type"
          value={type}
          onChange={onTypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
      </FormControl>
     {type === EntryType.HealthCheck 
        && <HealthCheckRatingForm
              healthCheckRating = {healthCheckRating}
              onHealthCheckRatingChange = {onHealthCheckRatingChange} 
      />}
     {type === EntryType.Hospital 
        && <HospitalEntryForm
              discharge={discharge}
              setDischarge={setDischarge}
      />}
      {type === EntryType.OccupationalHealthcare
        && <OccupationalEntryForm
              employerName={employerName}
              setEmployerName={setEmployerName}
              sickLeave={sickLeave}
              setSickLeave={setSickLeave}
      />}
      
      <Grid style={{ marginTop: 10 }}>
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
            onClick={addEntry} 
            style={{ float: "right" }}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  );
};

export default AddEntryForm;