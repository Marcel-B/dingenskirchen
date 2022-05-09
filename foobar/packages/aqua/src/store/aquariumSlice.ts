import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Aquarium, AquariumFormValues } from 'shared-types';
import { RootState } from './store';
import axios from 'axios';

const aquarienAdapter = createEntityAdapter<Aquarium>();

export const createAquariumAsync = createAsyncThunk<Aquarium, AquariumFormValues>(
  'form/createAquariumAsync',
  async (aquariumFormValues, thunkAPI) => {
    try {
      //axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      const response = await axios.post<Aquarium>(`http://localhost:4000/aquarien`, aquariumFormValues);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const fetchAquarienAsync = createAsyncThunk<Aquarium[]>(
  'overview/fetchAquarienAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Aquarium[]>(`http://localhost:4000/aquarien`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const deleteAquariumAsync = createAsyncThunk<string, string>(
  'overview/deleteAquariumAsync',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete<string>(`http://localhost:4000/aquarien/${id}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const aquariumSlice = createSlice({
  name: 'aquarium',
  initialState: aquarienAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(createAquariumAsync.pending, (state) => {
    });
    builder.addCase(createAquariumAsync.fulfilled, (state, action) => {
      aquarienAdapter.addOne(state, action.payload);
    });
    builder.addCase(createAquariumAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deleteAquariumAsync.pending, (state) => {
    });
    builder.addCase(deleteAquariumAsync.fulfilled, (state, action) => {
      aquarienAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteAquariumAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchAquarienAsync.pending, (state) => {
    });
    builder.addCase(fetchAquarienAsync.fulfilled, (state, action) => {
      aquarienAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchAquarienAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const aquariumSelectors = aquarienAdapter.getSelectors((state: RootState) => state.aquarien);