import {  InputLabel, MenuItem, Select, SelectChangeEvent, FormControl } from '@mui/material';
import { HealthCheckRating } from "../../types";

interface RatingsOption{
  value: HealthCheckRating;
  label: string;
}

const ratingsOptions: RatingsOption[] = [];
Object.values(HealthCheckRating).forEach(v => {if(typeof v === 'number') ratingsOptions.push({value: v, label:v.toString()}); });

interface OnHealthCehckRatingFormProps {
  healthCheckRating: HealthCheckRating;
  onHealthCheckRatingChange: (event: SelectChangeEvent<string>) => void;
}

const HealthCheckRatingForm = ({healthCheckRating, onHealthCheckRatingChange}: OnHealthCehckRatingFormProps) => {


  return (
    <FormControl>
    <InputLabel style={{ marginTop: 10 }} id="healthCheckRating">Health check rating</InputLabel>
    <Select
      style={{ marginTop: 10 }}
      labelId="healthCheckRating"
      label="Health check rating"
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
  );
};

export default HealthCheckRatingForm;