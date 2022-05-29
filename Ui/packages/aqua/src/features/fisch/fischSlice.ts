import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Fisch, FischFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface FischState {
  addFisch: boolean;
  updateFisch: boolean;
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

export const updateFischAsync = createAsyncThunk<Fisch, FischFormValues>(
  'form/updateFischAsync',
  async (fischFormValues, thunkAPI) => {
    try {
      return await agent.Fisch.update(fischFormValues);
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
    updateFisch: false,
    fischId: ''
  }),
  reducers: {
    addFisch: (state) => {
      state.addFisch = true;
    },
    updateFisch: (state, action) => {
      state.updateFisch = true;
      state.fischId = action.payload;
    },
    resetFisch: (state) => {
      state.addFisch = false;
      state.updateFisch = false;
      state.fischId = '';
    },
  },
  extraReducers: (builder => {
    builder.addCase(createFischAsync.pending, (state) => {
    });
    builder.addCase(createFischAsync.fulfilled, (state, action) => {
      fischeAdapter.addOne(state, action.payload);
    });
    builder.addCase(createFischAsync.rejected, (state, action) => {
    });
    builder.addCase(updateFischAsync.pending, (state) => {
    });
    builder.addCase(updateFischAsync.fulfilled, (state, action) => {
      fischeAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateFischAsync.rejected, (state, action) => {
    });
    builder.addCase(deleteFischAsync.pending, (state) => {
    });
    builder.addCase(deleteFischAsync.fulfilled, (state, action) => {
      fischeAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteFischAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchFischeAsync.pending, (state) => {
    });
    builder.addCase(fetchFischeAsync.fulfilled, (state, action) => {
      fischeAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchFischeAsync.rejected, (state, action) => {
      console.log(action.error.message);
    });
  }),
});

export const fischeSelectors = fischeAdapter.getSelectors((state: RootState) => state.fische);
export const {resetFisch, updateFisch, addFisch} = fischSlice.actions;