type discharge = {
  date: string,
  criteria: string,
};

interface HospitalDischargeProps {
  discharge: discharge
}

const Hospital = ({ discharge }: HospitalDischargeProps) => {
  return (
    <div style = {{ margin: '5px'}}>
      <p>Discharge date: {discharge.date}</p>
      <p>Criteria: {discharge.criteria}</p>
    </div>
  );
};

export default Hospital;