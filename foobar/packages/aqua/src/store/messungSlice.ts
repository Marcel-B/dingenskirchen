import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Messung, MessungFormValues } from 'shared-types';
import { RootState } from './store';


const messungenAdapter = createEntityAdapter<Messung>();

export const fetchMessungenAsync = createAsyncThunk<Messung[]>(
  'overview/fetchMessungenAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Messung[]>(`https://localhost:7269/api/messung`);
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
      const response = await axios.post<Messung>(`https://localhost:7269/api/messung`, messungFormValues);
      return response.data;
    } catch (e: any) {
      return thungAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const messungSlice = createSlice({
  name: 'messung',
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
      messungenAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchMessungenAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const messungenSelectors = messungenAdapter.getSelectors((state: RootState) => state.messungen);
