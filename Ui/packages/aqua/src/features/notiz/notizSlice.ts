import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notiz, NotizFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface NotizState {
  addNotiz: boolean;
  updateNotiz: boolean;
  notizId: string;
}

const notizenAdapter = createEntityAdapter<Notiz>();

export const fetchNotizenAsync = createAsyncThunk<Notiz[]>(
  'overview/fetchNotizenAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Notiz.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const createNotizAsync = createAsyncThunk<Notiz, NotizFormValues>(
  'form/createNotizAsync',
  async (formValues, thunkAPI) => {
    try {
      return await agent.Notiz.create(formValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const updateNotizAsync = createAsyncThunk<Notiz, NotizFormValues>(
  'form/updateNotizAsync',
  async (formValues, thunkAPI) => {
    try {
      return await agent.Notiz.update(formValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const deleteNotizAsync = createAsyncThunk<string, string>(
  'form/deleteNotizAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Notiz.delete(id);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const notizSlice = createSlice({
  name: 'notiz',
  initialState: notizenAdapter.getInitialState<NotizState>({
    addNotiz: false,
    updateNotiz: false,
    notizId: ''
  }),
  reducers: {
    addNotiz: (state) => {
      state.addNotiz = true;
    },
    updateNotiz: (state, action: PayloadAction<string>) => {
      state.updateNotiz = true;
      state.addNotiz = false;
      state.notizId = action.payload;
    },
    resetNotiz: (state) => {
      state.addNotiz = false;
      state.updateNotiz = false;
      state.notizId = '';
    },
  },
  extraReducers: builder => {
    builder.addCase(createNotizAsync.pending, (state) => {
      console.log('Create Notiz pending');
    });
    builder.addCase(createNotizAsync.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(createNotizAsync.fulfilled, (state, action) => {
      notizenAdapter.addOne(state, action.payload);
      state.addNotiz = false;
    });
    builder.addCase(updateNotizAsync.pending, (state) => {
      console.log('Update Notiz pending');
    });
    builder.addCase(updateNotizAsync.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(updateNotizAsync.fulfilled, (state, action) => {
      notizenAdapter.upsertOne(state, action.payload);
      state.notizId = '';
      state.updateNotiz = false;
    });
    builder.addCase(deleteNotizAsync.pending, (state) => {
      console.log('Delete Notiz pending');
    });
    builder.addCase(deleteNotizAsync.rejected, (state, action) => {
      console.error(action.error);
    });
    builder.addCase(deleteNotizAsync.fulfilled, (state, action) => {
      notizenAdapter.removeOne(state, action.payload);
    });
    builder.addCase(fetchNotizenAsync.pending, (state) => {
      console.log('Fetch Notizen pending');
    });
    builder.addCase(fetchNotizenAsync.rejected, (state, action) => {
      console.error(action.payload);
    });
    builder.addCase(fetchNotizenAsync.fulfilled, (state, action) => {
      notizenAdapter.upsertMany(state, action.payload);
    });
  },
});
export const notizSelectors = notizenAdapter.getSelectors((state: RootState) => state.notizen);
export const {addNotiz, resetNotiz, updateNotiz} = notizSlice.actions;