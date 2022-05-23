import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Fisch, FischFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface FischState {
  addFisch: boolean;
  editFisch: boolean;
  fischId: string;
}

const fischeAdapter = createEntityAdapter<Fisch>();

export const fetchFischeAsync = createAsyncThunk<Fisch[]>(
  'overview/fetchFischeAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Fisch.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createFischAsync = createAsyncThunk<Fisch, FischFormValues>(
  'form/createFischAsync',
  async (fischFormValues, thunkAPI) => {
    try {
      return await agent.Fisch.create(fischFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const deleteFischAsync = createAsyncThunk<string, string>(
  'form/deleteFischAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Fisch.delete(id);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const fischSlice = createSlice({
  name: 'fisch',
  initialState: fischeAdapter.getInitialState<FischState>({
    addFisch: false,
    editFisch: false,
    fischId: ''
  }),
  reducers: {
    addFisch: (state) => {
      state.addFisch = true;
    },
    resetFisch: (state) => {
      state.addFisch = false;
      state.editFisch = false;
      state.fischId = '';
    },
    editFisch: (state, action) => {
      state.editFisch = true;
      state.fischId = action.payload;
    },
  },
  extraReducers: (builder => {
    builder.addCase(createFischAsync.pending, (state) => {
    });
    builder.addCase(createFischAsync.fulfilled, (state, action) => {
      fischeAdapter.addOne(state, action.payload);
      //state.success = true;
      //state.message = `Fisch ${action.payload.name} hinzugefügt`;
    });
    builder.addCase(createFischAsync.rejected, (state, action) => {
      //state.error = true;
      //state.message = action.error.message ?? 'Fehler';
    });
    builder.addCase(deleteFischAsync.pending, (state) => {
    });
    builder.addCase(deleteFischAsync.fulfilled, (state, action) => {
      fischeAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteFischAsync.rejected, (state, action) => {
      console.log(action.error);
      //state.error = true;
      //state.message = action.error.message ?? 'Fehler';
    });
    builder.addCase(fetchFischeAsync.pending, (state) => {
    });
    builder.addCase(fetchFischeAsync.fulfilled, (state, action) => {
      fischeAdapter.upsertMany(state, action.payload);
      //state.success = true;
      //state.message = 'Fische geladen';
    });
    builder.addCase(fetchFischeAsync.rejected, (state, action) => {
      console.log(action.error.message);
      //state.error = true;
      //state.message = action.error.message ?? 'Fehler';
    });
  }),
});

export const fischeSelectors = fischeAdapter.getSelectors((state: RootState) => state.fische);
export const {resetFisch, editFisch, addFisch} = fischSlice.actions;