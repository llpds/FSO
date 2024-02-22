export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

// export type Gender = 'male' | 'female' | 'other';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}


export interface PatientEntry {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth: string;
}

export type NonSsnPatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;