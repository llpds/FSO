import { Entry, EntryType, Diagnosis } from "../../types";

interface Props {
  entry : Entry
  diagnoses: Diagnosis[]
}

const ShowEntry = ({ entry, diagnoses }: Props) => {
  if(entry.type === EntryType.Hospital) console.log('hosp');
  return (
    <div>
      {entry.date} <i>{entry.description}</i>
      <ul>
            {entry.diagnosisCodes?.map((c,i) => <li key={i}> {c} {c ? diagnoses.find(d => d.code === c)?.name : null} </li>)}
      </ul>
    </div>
  );
};

export default ShowEntry;