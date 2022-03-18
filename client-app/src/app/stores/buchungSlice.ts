import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Buchung} from '../models/buchung';
import agent from '../api/agent';

interface BuchungState {
  selectedBuchung: Buchung | null;
  buchungen: Buchung[];
  status: string;
  initial: boolean;
}

const initialState: BuchungState = {
  selectedBuchung: null,
  buchungen: [],
  status: 'idle',
  initial: true,
};

export const getBuchungenAsync = createAsyncThunk<Buchung[], void>(
  'buchung/getBuchungenAsync',
  async () => {
    try {
      return await agent.Buchungen.list();
    } catch (e) {
      console.log(e);
      return [];
    }
  },
);

export const buchungSlice = createSlice({
  name: 'buchung',
  initialState,
  reducers: {
    setBuchung: (state, action) => {
      state.selectedBuchung = action.payload;
    },
    setBuchungen: (state, action) => {
      state.buchungen = action.payload;
    },
  },

  extraReducers: (builder => {
    builder.addCase(getBuchungenAsync.pending, (state, action) => {
      state.status = 'Laden...';
      console.log(action);
    });
    builder.addCase(getBuchungenAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.initial = false;
      state.buchungen = action.payload ?? [];
    });
    builder.addCase(getBuchungenAsync.rejected, (state, action) => {
      state.status = 'error';
      console.log(action);
    });
  }),
});

export const { setBuchung, setBuchungen } = buchungSlice.actions;