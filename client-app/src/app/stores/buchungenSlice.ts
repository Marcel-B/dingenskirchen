import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Buchung} from '../models/buchung';
import agent from '../api/agent';
import { RootState } from './index';

const buchungenAdapter = createEntityAdapter<Buchung>();
export const fetchBuchungenAsync = createAsyncThunk<Buchung[]>(
  'catalog/fetchBuchungenAsync',
  async () => {
    try {
      return await agent.Buchungen.list();
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);

export const buchungenSlice = createSlice({
  name: 'buchungen',
  initialState: buchungenAdapter.getInitialState({
    buchungenGeladen: false,
    status: 'idle'
  }),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(fetchBuchungenAsync.pending, (state) => {
      state.status = "pendingFetchBuchungen"
    });
    builder.addCase(fetchBuchungenAsync.fulfilled, (state, action) => {
      buchungenAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.buchungenGeladen = true;
    });
    builder.addCase(fetchBuchungenAsync.rejected, (state) => {
      state.status = "idle";
    });
  })
});

export const buchungenSelectors = buchungenAdapter.getSelectors((state: RootState) => state.buchungen);