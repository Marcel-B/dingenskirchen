import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Feed } from 'shared-types';
import agent from '../../common/agent';
import StatusType from "../../models/statusType";

export const fetchFeedAsync = createAsyncThunk<Feed>(
  'overview/fetchFeedAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Feed.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

interface State {
  feed: Feed;
  status: StatusType;
}

const InitialState: State = {feed: {total: 0, groupedFeeds: []}, status: StatusType.Idle}

export const feedSlice = createSlice({
  name: 'feed',
  initialState: InitialState,
  reducers: {
    clearFeed: (state) => {
      state.feed = {total: 0, groupedFeeds: []};
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchFeedAsync.pending, (state) => {
      state.status = StatusType.Loading;
    });
    builder.addCase(fetchFeedAsync.rejected, (state, action) => {
      console.error(action.payload);
      state.status = StatusType.Error;
    });
    builder.addCase(fetchFeedAsync.fulfilled, (state, action) => {
      state.feed = action.payload;
      state.status = StatusType.Idle;
    });
  },
});

export const feedSelectors = InitialState;
export const {clearFeed} = feedSlice.actions;
