import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Messung, MessungFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface MessungState {
  addMessung: boolean;
  updateMessung: boolean;
  messungId: string;
}

const messungenAdapter = createEntityAdapter<Messung>();

export const fetchMessungenAsync = createAsyncThunk<Messung[]>(
  'overview/fetchMessungenAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.MessungCall.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createMessungAsync = createAsyncThunk<Messung, MessungFormValues>(
  'form/createMessungAsync',
  async (messungFormValues, thungAPI) => {
    try {
      return await agent.MessungCall.create(messungFormValues);
    } catch (e: any) {
      return thungAPI.rejectWithValue({error: e.data});
    }
  },
);

export const updateMessungAsync = createAsyncThunk<Messung, MessungFormValues>(
  'form/updateMessungAsync',
  async (messungFormValues, thungAPI) => {
    try {
      return await agent.MessungCall.update(messungFormValues);
    } catch (e: any) {
      return thungAPI.rejectWithValue({error: e.data});
    }
  },
);

export const deleteMessungAsync = createAsyncThunk<string, string>(
  'form/deleteMessungAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.MessungCall.delete(id);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const messungSlice = createSlice({
  name: 'messung',
  initialState: messungenAdapter.getInitialState<MessungState>({
    addMessung: false,
    updateMessung: false,
    messungId: ''
  }),
  reducers: {
    addMessung: (state) => {
      state.addMessung = true;
    },
    updateMessung: (state, action: PayloadAction<string>) => {
      state.addMessung = false;
      state.updateMessung = true;
      state.messungId = action.payload;
    },
    resetMessung: (state) => {
      state.addMessung = false;
      state.updateMessung = false;
      state.messungId = '';
    },
  },
  extraReducers: (builder => {
    builder.addCase(createMessungAsync.pending, (state) => {
    });
    builder.addCase(createMessungAsync.fulfilled, (state, action) => {
      messungenAdapter.addOne(state, action.payload);
      state.addMessung = false;
    });
    builder.addCase(createMessungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(updateMessungAsync.pending, (state) => {
    });
    builder.addCase(updateMessungAsync.fulfilled, (state, action) => {
      messungenAdapter.upsertOne(state, action.payload);
      state.updateMessung = false;
      state.messungId = '';
    });
    builder.addCase(updateMessungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deleteMessungAsync.pending, (state) => {
      console.log('Delete Messung pending');
    });
    builder.addCase(deleteMessungAsync.fulfilled, (state, action) => {
      messungenAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteMessungAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchMessungenAsync.pending, (state) => {
      console.log('Fetch Messungen pending');
    });
    builder.addCase(fetchMessungenAsync.fulfilled, (state, action) => {
      messungenAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchMessungenAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const messungenSelectors = messungenAdapter.getSelectors((state: RootState) => state.messungen);
export const {addMessung, updateMessung, resetMessung} = messungSlice.actions;