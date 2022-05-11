import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Duengung, DuengungFormValues } from 'shared-types';
import { RootState } from './store';


const duengungenAdapter = createEntityAdapter<Duengung>();

export const fetchDuengungenAsync = createAsyncThunk<Duengung[]>(
  'overview/fetchDuengungenAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Duengung[]>(`https://localhost:7269/api/duengung`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createDuengungAsync = createAsyncThunk<Duengung, DuengungFormValues>(
  'form/createDuengungAsync',
  async (duengungFormValues, thungAPI) => {
    try {
      const response = await axios.post<Duengung>(`https://localhost:7269/api/duengung`, duengungFormValues);
      return response.data;
    } catch (e: any) {
      return thungAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const deleteDuengungAsync = createAsyncThunk<string, string>(
  'overview/deleteDuengungAsync',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete<string>(`https://localhost:7269/api/duengung/${id}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const duengungSlice = createSlice({
  name: 'duengung',
  initialState: duengungenAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(createDuengungAsync.pending, (state) => {
    });
    builder.addCase(createDuengungAsync.fulfilled, (state, action) => {
      duengungenAdapter.addOne(state, action.payload);
    });
    builder.addCase(createDuengungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deleteDuengungAsync.pending, (state) => {
    });
    builder.addCase(deleteDuengungAsync.fulfilled, (state, action) => {
      duengungenAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteDuengungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchDuengungenAsync.pending, (state) => {
    });
    builder.addCase(fetchDuengungenAsync.fulfilled, (state, action) => {
      duengungenAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchDuengungenAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const duengungenSelectors = duengungenAdapter.getSelectors((state: RootState) => state.duengungen);
