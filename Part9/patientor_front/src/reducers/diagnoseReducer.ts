import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from '../store';
import { Diagnosis } from '../types';
import diagnoseService from "../services/diagnoses";

const initialState: Diagnosis[] = [];

const diagnoseSlice = createSlice({
  name: 'diagnoses',
  initialState,
  reducers: {
    setDiagnoses(_state, action: PayloadAction<Diagnosis[]>) { return action.payload; }
  },
});

export const { setDiagnoses } = diagnoseSlice.actions;

export const initializeDiagnoses = (): AppThunk => async dispatch => {
  const diagnoses = await diagnoseService.getAll();
  dispatch(setDiagnoses(diagnoses));
};

export default diagnoseSlice.reducer;