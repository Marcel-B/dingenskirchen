import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Aquarium, AquariumFormValues } from 'shared-types';
import { RootState } from '../../store/store';
import agent from '../../common/agent';

interface AquariumState {
  addAquarium: boolean;
  editAquarium: boolean;
  aquariumId: string;
};

const aquarienAdapter = createEntityAdapter<Aquarium>();

export const createAquariumAsync = createAsyncThunk<Aquarium, AquariumFormValues>(
  'form/createAquariumAsync',
  async (aquariumFormValues, thunkAPI) => {
    try {
      return await agent.Aquarium.create(aquariumFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const updateAquariumAsync = createAsyncThunk<Aquarium, AquariumFormValues>(
  'form/editAquariumAsync',
  async (aquariumFormValues, thunkAPI) => {
    try {
      return await agent.Aquarium.update(aquariumFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  },
);

export const fetchAquarienAsync = createAsyncThunk<Aquarium[]>(
  'overview/fetchAquarienAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Aquarium.list();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const deleteAquariumAsync = createAsyncThunk<string, string>(
  'overview/deleteAquariumAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Aquarium.delete(id);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const aquariumSlice = createSlice({
  name: 'aquarium',
  initialState: aquarienAdapter.getInitialState<AquariumState>({
    addAquarium: false,
    editAquarium: false,
    aquariumId: ''
  }),
  reducers: {
    addAquarium: (state) => {
      state.addAquarium = true;
    },
    editAquarium: (state, action: PayloadAction<string>) => {
      state.editAquarium = true;
      state.aquariumId = action.payload;
    },
    resetAquarium: (state) => {
      state.addAquarium = false;
      state.editAquarium = false;
      state.aquariumId = '';
    }
  },
  extraReducers: (builder => {
    builder.addCase(createAquariumAsync.pending, (state) => {
    });
    builder.addCase(createAquariumAsync.fulfilled, (state, action) => {
      aquarienAdapter.addOne(state, action.payload);
    });
    builder.addCase(createAquariumAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(updateAquariumAsync.pending, (state) => {
    });
    builder.addCase(updateAquariumAsync.fulfilled, (state, action) => {
      aquarienAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updateAquariumAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(deleteAquariumAsync.pending, (state) => {
    });
    builder.addCase(deleteAquariumAsync.fulfilled, (state, action) => {
      aquarienAdapter.removeOne(state, action.payload);
    });
    builder.addCase(deleteAquariumAsync.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(fetchAquarienAsync.pending, (state) => {
    });
    builder.addCase(fetchAquarienAsync.fulfilled, (state, action) => {
      aquarienAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchAquarienAsync.rejected, (state, action) => {
      console.log(action.error);
    });
  }),
});

export const aquariumSelectors = aquarienAdapter.getSelectors((state: RootState) => state.aquarien);
export const {addAquarium, editAquarium, resetAquarium} = aquariumSlice.actions;