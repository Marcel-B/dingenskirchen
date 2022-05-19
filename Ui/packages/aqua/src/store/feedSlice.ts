import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Feed} from 'shared-types';
import agent from '../common/agent';

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
}

const InitialState: State = {feed: {total: 0, groupedFeeds: []}}

export const feedSlice = createSlice({
    name: 'feed',
    initialState: InitialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchFeedAsync.pending, (state) => {
            console.log('Fetch Feed pending');
        });
        builder.addCase(fetchFeedAsync.rejected, (state, action) => {
            console.error(action.payload);
        });
        builder.addCase(fetchFeedAsync.fulfilled, (state, action) => {
            state.feed = action.payload;
        });
    },
});

export const feedSelectors = InitialState;
