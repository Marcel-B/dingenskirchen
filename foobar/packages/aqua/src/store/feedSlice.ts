import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Feed } from 'shared-types';
import { RootState } from './store';
import agent from '../common/agent';

const feedAdapter = createEntityAdapter<Feed>();

export const fetchFeedAsync = createAsyncThunk<Feed[]>(
  'overview/fetchFeedAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Feed.list();
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
