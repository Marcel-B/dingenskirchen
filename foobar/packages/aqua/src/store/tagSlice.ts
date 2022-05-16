import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import agent from '../common/agent';

const tagsAdapter = createEntityAdapter<string>();

export const fetchTagsAsync = createAsyncThunk<string[]>(
  'overview/fetchTagsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Tag.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const tagSlice = createSlice({
  name: 'tag',
  initialState: tagsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTagsAsync.pending, (state) => {
      console.log('Fetch Tags pending');
    });
    builder.addCase(fetchTagsAsync.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(fetchTagsAsync.fulfilled, (state, action) => {
      tagsAdapter.upsertMany(state, action.payload);
    });
  },
});

export const tagSelectors = tagsAdapter.getSelectors((state: RootState) => state.tags);
