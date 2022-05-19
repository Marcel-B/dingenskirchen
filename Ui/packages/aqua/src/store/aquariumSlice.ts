import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Aquarium, AquariumFormValues } from 'shared-types';
import { RootState } from './store';
import agent from '../common/agent';

const aquarienAdapter = createEntityAdapter<Aquarium>();

export const createAquariumAsync = createAsyncThunk<Aquarium, AquariumFormValues>(
  'form/createAquariumAsync',
  async (aquariumFormValues, thunkAPI) => {
    try {
      return await agent.Aquarium.create(aquariumFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({ error: e.data });
    }
  },
);

export const fetchAquarienAsync = createAsyncThunk<Aquarium[]>(
  'overview/fetchAquarienAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Aquarium.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const deleteAquariumAsync = createAsyncThunk<string, string>(
  'overview/deleteAquariumAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Aquarium.delete(id);
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