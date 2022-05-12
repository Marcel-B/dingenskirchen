import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Feed } from 'shared-types';
import axios from 'axios';
import { RootState } from './store';

const feedAdapter = createEntityAdapter<Feed>();

export const fetchFeedAsync = createAsyncThunk<Feed[]>(
  'overview/fetchFeedAsync',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Feed[]>(`https://localhost:7269/api/feed`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState: feedAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFeedAsync.pending, (state) => {
      console.log('Fetch Feed pending');
    });
    builder.addCase(fetchFeedAsync.rejected, (state, action) => {
      console.error(action.payload);
    });
    builder.addCase(fetchFeedAsync.fulfilled, (state, action) => {
      feedAdapter.upsertMany(state, action.payload);
    });
  },
});
export const feedSelectors = feedAdapter.getSelectors((state: RootState) => state.feed);
