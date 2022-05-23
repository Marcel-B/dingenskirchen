import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Messung, MessungFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface MessungState {
  addMessung: boolean;
  editMessung: boolean;
  messungId: string;
}

const messungenAdapter = createEntityAdapter<Messung>();

export const fetchMessungenAsync = createAsyncThunk<Messung[]>(
  'overview/fetchMessungenAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Messung.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createMessungAsync = createAsyncThunk<Messung, MessungFormValues>(
  'form/createMessungAsync',
  async (messungFormValues, thungAPI) => {
    try {
      return await agent.Messung.create(messungFormValues);
    } catch (e: any) {
      return thungAPI.rejectWithValue({error: e.data});
    }
  },
);

export const deleteMessungAsync = createAsyncThunk<string, string>(
  'form/deleteMessungAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Messung.delete(id);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const messungSlice = createSlice({
  name: 'messung',
  initialState: messungenAdapter.getInitialState<MessungState>({
    addMessung: false,
    editMessung: false,
    messungId: ''
  }),
  reducers: {
    resetMessung: (state) => {
      state.addMessung = false;
      state.editMessung = false;
      state.messungId = '';
    },
    addMessung: (state) => {
      state.addMessung = true;
    }
  },
  extraReducers: (builder => {
    builder.addCase(createMessungAsync.pending, (state) => {
    });
    builder.addCase(createMessungAsync.fulfilled, (state, action) => {
      messungenAdapter.addOne(state, action.payload);
    });
    builder.addCase(createMessungAsync.rejected, (state, action) => {
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
export const {addMessung, resetMessung} = messungSlice.actions;