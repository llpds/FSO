import { NewPatient, Gender, NewEntry, DiagnoseEntry, NewBaseEntry, EntryType, HealthCheckRating, Discharge, SickLeave } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};


const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};


const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


const isGender = (param: string): param is Gender => {
  // return ['male', 'female', 'other'].includes(str);
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType).map(v=> v.toString()).includes(param);
};

const parseType = (entryType: unknown): EntryType => {
  if(!isString(entryType) || !isEntryType(entryType)){
    throw new Error('Incorrect or missing entry type: ' + entryType);
  }
  return entryType;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing HealthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const parseDischarge = (object: unknown): Discharge =>  {
  if (!object || typeof object !== 'object' || !('date' in object) || !('criteria' in object)) {
    throw new Error('Incorrect or missing discharge data.');
  }
  
  return { 
    date: parseString(object.date),
    criteria: parseString(object.criteria)
  };
};
const parseSickLeave = (object: unknown): SickLeave =>  {
  if (!object || typeof object !== 'object' || !('startDate' in object) || !('endDate' in object)) {
    throw new Error('Incorrect or missing sickleave data.');
  }
  
  return { 
    startDate: parseString(object.startDate),
    endDate: parseString(object.endDate)
  };
};

const assertNever = (): never => {
  throw new Error(
    'Unhandled discriminated union member'
  );
};

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object)  {
    const newEntry: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries:[],
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};


export const toNewEntry = (object: unknown): NewEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('date' in object && 'type' in object && 'specialist' in object && 'description' in object && 'diagnosisCodes' in object && 'type' in object )  {
    const newEntry: NewBaseEntry = {
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      description: parseString(object.description),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    
    const parsedType:EntryType = parseType (object.type);

    switch(parsedType){
      case EntryType.HealthCheck:
        if('healthCheckRating' in object) {
          const healthCheckRating = parseHealthCheckRating(object.healthCheckRating);
          return {...newEntry, healthCheckRating, type: parsedType};
        } else {
          throw new Error(`healthCheckRating isn't in ${parsedType} type`);
        }
      case EntryType.Hospital:
        if('discharge' in object) {
          const discharge = parseDischarge(object.discharge);
          return {...newEntry, discharge, type: parsedType};
        } else {
          throw new Error(`discharge isn't in ${parsedType} type`);
        }
      case EntryType.OccupationalHealthcare:
        if('employerName' in object) {
          const employerName = parseString(object.employerName);
          if('sickLeave' in object){
            const sickLeave = parseSickLeave(object.sickLeave);
            return {...newEntry, employerName, sickLeave, type:parsedType};
          } else {
            return {...newEntry, employerName, type:parsedType};
          }
        } else {
          throw new Error(`employerName isn't in ${parsedType} type`);
        }
      default:
        return assertNever();
    }
  }
  throw new Error('Incorrect data: BaseEntry fields are missing');
};
