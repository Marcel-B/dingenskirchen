import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Buchung, BuchungFormValues } from '../models/buchung';
import agent from '../api/agent';


interface BuchungState {
  selectedBuchung: Buchung | null;
  status: string;
  initial: boolean;
}

const initialState: BuchungState = {
  selectedBuchung: null,
  status: 'idle',
  initial: true,
};

export const buchungSlice = createSlice({
  name: 'buchung',
  initialState,
  reducers: {
    setBuchung: (state, action) => {
      state.selectedBuchung = action.payload;
    },
  },

  extraReducers: (builder => {
  }),
});

export const { setBuchung } = buchungSlice.actions;