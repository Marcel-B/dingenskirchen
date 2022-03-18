import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Buchung } from '../models/buchung';
import agent from '../api/agent';
import { RootState } from './index';
import {
  ausgabenGesamt,
  ausgabenMonatlichReal,
  einnahmenGesamt,
  restMonatlich,
  restMonatlichReal,
} from './buchungCalculator';

const buchungenAdapter = createEntityAdapter<Buchung>();

export const fetchBuchungenAsync = createAsyncThunk<Buchung[]>(
  'catalog/fetchBuchungenAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Buchungen.list();
    } catch (e: any) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const fetchBuchungAsync = createAsyncThunk<Buchung, string>(
  'catalog/fetchBuchungAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Buchungen.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
);

interface BuchungenState {
  buchungenGeladen: boolean;
  status: string;
  einnahmenGesamt: number | null;
  ausgabenGesamt: number | null;
  ausgabenGesamtReal: number | null;
  restMonatlich: number | null;
  restMonatlichReal: number | null;
}

const initialState: BuchungenState = {
  buchungenGeladen: false,
  einnahmenGesamt: null,
  ausgabenGesamt: null,
  ausgabenGesamtReal: null,
  restMonatlich: null,
  restMonatlichReal: null,
  status: 'idle',
};

export const buchungenSlice = createSlice({
  name: 'buchungen',
  initialState: buchungenAdapter.getInitialState({
    ...initialState,
  }),
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(fetchBuchungenAsync.pending, (state) => {
      state.status = 'pendingFetchBuchungen';
    });
    builder.addCase(fetchBuchungenAsync.fulfilled, (state, action) => {
      buchungenAdapter.setAll(state, action.payload);
      state.status = 'idle';
      state.einnahmenGesamt = einnahmenGesamt(action.payload);
      state.ausgabenGesamt = ausgabenGesamt(action.payload);
      state.ausgabenGesamtReal = ausgabenMonatlichReal(action.payload);
      state.restMonatlich = restMonatlich(action.payload);
      state.restMonatlichReal = restMonatlichReal(action.payload);
      state.buchungenGeladen = true;
    });
    builder.addCase(fetchBuchungenAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchBuchungAsync.pending, (state) => {
      state.status = 'pendingFetchBuchung';
    });
    builder.addCase(fetchBuchungAsync.fulfilled, (state, action) => {
      buchungenAdapter.upsertOne(state, action.payload);
      state.status = 'idle';
    });
    builder.addCase(fetchBuchungAsync.rejected, (state, action) => {
      console.log(action);
      state.status = 'idle';
    });
  }),
});

export const buchungenSelectors = buchungenAdapter.getSelectors((state: RootState) => state.buchungen);