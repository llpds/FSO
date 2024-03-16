import { useState, SyntheticEvent } from "react";
import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppSelector } from "../../store";
import { HealthCheckRating, EntryType, NewBaseEntry, NewEntry } from "../../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

interface RatingsOption{
  value: HealthCheckRating;
  label: string;
}

const ratingsOptions: RatingsOption[] = [];
Object.values(HealthCheckRating).forEach(v => {if(typeof v === 'number') ratingsOptions.push({value: v, label:v.toString()}); });


const AddEntryForm = ({onSubmit, onCancel }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [type, setType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [diagnosesCodes, setDiagnosesCodes] = useState<string[] | never[]>([]);

  const diagnoses = useAppSelector(state => state.diagnoses);


  const diagnosesOption:string[] = diagnoses.map(d=> d.code);

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
      default:
        console.log('newer');
      }

      // setType(EntryType.HealthCheck);
      // setDescription('');
      // setDate('');
      // setSpecialist('');
      // setHealthCheckRating(HealthCheckRating.Healthy);
      // setDiagnosesCodes([]);
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
        <FormControl>
        <InputLabel style={{ marginTop: 20 }} id="healthCheckRating">HealthCheckRating</InputLabel>
        <Select
          style={{ marginTop: 10 }}
          labelId="healthCheckRating"
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
        </FormControl>
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