import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from '../store';
import { Patient, PatientFormValues } from '../types';
import patientService from "../services/patients";

const initialState: Patient[] = [];

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients(_state, action: PayloadAction<Patient[]>) { return action.payload; },
    appendPatient(state, action: PayloadAction<Patient>) { return state.concat(action.payload); }
  },
});

export const { setPatients, appendPatient } = patientSlice.actions;

export const initializePatients = (): AppThunk => async dispatch => {
  const patients = await patientService.getAll();
  dispatch(setPatients(patients));
};

export const createPatient = (content:PatientFormValues):AppThunk => async dispatch => {
  const addedPatient = await patientService.create(content);
  dispatch(appendPatient(addedPatient));
};


export default patientSlice.reducer;