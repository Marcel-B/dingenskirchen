import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Messung, MessungFormValues } from 'shared-types';

/*
interface MessungState {
  wert: number | null;
  datum: Date;
  typ: number | null;
}

const initialState: MessungState = {
  wert: null,
  datum: new Date(),
  typ: null,
};
*/

const messungenAdapter = createEntityAdapter<Messung>();

export const fetchMessungenAsync = createAsyncThunk<Messung[]>(
  'overview/fetchMessungenAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Messung[]>(`http://localhost:8080/messungen`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createMessungAsync = createAsyncThunk<Messung, MessungFormValues>(
  'form/createMessungAsync',
  async (messungFormValues, thungAPI) => {
    try {
      const response = await axios.post<Messung>(`http://localhost:8080/messungen`, messungFormValues);
      return response.data;
    } catch (e: any) {
      return thungAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const wertSlice = createSlice({
  name: 'wert',
  initialState: messungenAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(createMessungAsync.pending, (state) => {
    });
    builder.addCase(createMessungAsync.fulfilled, (state, action) => {
      messungenAdapter.addOne(state, action.payload);
    });
    builder.addCase(createMessungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchMessungenAsync.pending, (state) => {
    });
    builder.addCase(fetchMessungenAsync.fulfilled, (state, action) => {
      messungenAdapter.addMany(state, action.payload);
    });
    builder.addCase(fetchMessungenAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const commonActions = wertSlice.actions;