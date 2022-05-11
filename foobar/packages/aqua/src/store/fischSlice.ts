import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Fisch, FischFormValues } from 'shared-types';
import { RootState } from './store';
import axios from 'axios';

const fischeAdapter = createEntityAdapter<Fisch>();

export const fetchFischeAsync = createAsyncThunk<Fisch[]>(
  'overview/fetchFischeAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Fisch[]>(`https://localhost:7269/api/fisch`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createFischAsync = createAsyncThunk<Fisch, FischFormValues>(
  'form/createFischAsync',
  async (fischFormValues, thunkAPI) => {
    try {
      const response = await axios.post<Fisch>(`https://localhost:7269/api/fisch`, fischFormValues);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const deleteFischAsync = createAsyncThunk<string, string>(
  'form/deleteFischAsync',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete<string>(`https://localhost:7269/api/fisch/${id}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const fischSlice = createSlice({
  name: 'fisch',
  initialState: fischeAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(createFischAsync.pending, (state) => {
    });
    builder.addCase(createFischAsync.fulfilled, (state, action) => {
      fischeAdapter.addOne(state, action.payload);
    });
    builder.addCase(createFischAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deleteFischAsync.pending, (state) => {
    });
    builder.addCase(deleteFischAsync.fulfilled, (state, action) => {
      fischeAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteFischAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchFischeAsync.pending, (state) => {
    });
    builder.addCase(fetchFischeAsync.fulfilled, (state, action) => {
      fischeAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchFischeAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const fischeSelectors = fischeAdapter.getSelectors((state: RootState) => state.fische);
