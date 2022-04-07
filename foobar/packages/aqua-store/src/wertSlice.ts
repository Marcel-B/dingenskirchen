import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Messung, MessungFormValues } from 'shared-types';

interface MessungState {
  wert: number | null;
  datum: Date;
  typ: number | null;
}

export const createMessungAsync = createAsyncThunk<Messung, MessungFormValues>(
  'form/createMessungAsync',
  async (messungFormValues, thungAPI) => {
    try {
      const response = await axios.post<Messung>(`/messung`, messungFormValues);
      return response.data;
    } catch (e: any) {
      return thungAPI.rejectWithValue({ error: e.data });
    }
  },
);

const initialState: MessungState = {
  wert: null,
  datum: new Date(),
  typ: null,
};

export const wertSlice = createSlice({
  name: 'wert',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(createMessungAsync.pending, (state) => {

    });
    builder.addCase(createMessungAsync.fulfilled, (state, action) => {

    });
    builder.addCase(createMessungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const commonActions = wertSlice.actions;