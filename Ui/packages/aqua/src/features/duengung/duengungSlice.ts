import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Duengung, DuengungFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface DuengungState {
  addDuengung: boolean;
  updateDuengung: boolean;
  duengungId: string;
}

const duengungenAdapter = createEntityAdapter<Duengung>();

export const fetchDuengungenAsync = createAsyncThunk<Duengung[]>(
  'overview/fetchDuengungenAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Duengung.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createDuengungAsync = createAsyncThunk<Duengung, DuengungFormValues>(
  'form/createDuengungAsync',
  async (duengungFormValues, thunkAPI) => {
    try {
      return await agent.Duengung.create(duengungFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const updateDuengungAsync = createAsyncThunk<Duengung, DuengungFormValues>(
  'form/updateDuengungAsync',
  async (duengungFormValues, thunkAPI) => {
    try {
      return await agent.Duengung.update(duengungFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const deleteDuengungAsync = createAsyncThunk<string, string>(
  'overview/deleteDuengungAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Duengung.delete(id);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const duengungSlice = createSlice({
  name: 'duengung',
  initialState: duengungenAdapter.getInitialState<DuengungState>({
    addDuengung: false,
    updateDuengung: false,
    duengungId: ''
  }),
  reducers: {
    addDuengung: (state) => {
      state.addDuengung = true;
    },
    updateDuengung: (state, action: PayloadAction<string>) => {
      state.updateDuengung = true;
      state.addDuengung = false;
      state.duengungId = action.payload;
    },
    resetDuengung: (state) => {
      state.addDuengung = false;
      state.updateDuengung = false;
      state.duengungId = '';
    },
  },
  extraReducers: (builder => {
    builder.addCase(createDuengungAsync.pending, (state) => {
    });
    builder.addCase(createDuengungAsync.fulfilled, (state, action) => {
      duengungenAdapter.addOne(state, action.payload);
    });
    builder.addCase(createDuengungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(updateDuengungAsync.pending, (state) => {
    });
    builder.addCase(updateDuengungAsync.fulfilled, (state, action) => {
      duengungenAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateDuengungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deleteDuengungAsync.pending, (state) => {
    });
    builder.addCase(deleteDuengungAsync.fulfilled, (state, action) => {
      duengungenAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteDuengungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchDuengungenAsync.pending, (state) => {
    });
    builder.addCase(fetchDuengungenAsync.fulfilled, (state, action) => {
      duengungenAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchDuengungenAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const duengungenSelectors = duengungenAdapter.getSelectors((state: RootState) => state.duengungen);
export const {addDuengung, updateDuengung, resetDuengung} = duengungSlice.actions;