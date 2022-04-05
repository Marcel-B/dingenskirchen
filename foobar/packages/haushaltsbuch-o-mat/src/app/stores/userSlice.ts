import { User, UserFormValues } from '../models/user';
import agent from '../api/agent';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  token: null,
};

export const loginAsync = createAsyncThunk<User, { userFormValue: UserFormValues }>(
  'user/loginAsync',
  async ({ userFormValue }, thunkAPI) => {
    try {
      return await agent.Account.login(userFormValue);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const registerAsync = createAsyncThunk<User, { userFormValue: UserFormValues }>(
  'user/registerAsync',
  async ({ userFormValue }, thunkAPI) => {
    try {
      return await agent.Account.register(userFormValue);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const fetchUserAsync = createAsyncThunk<User, void>(
  'user/fetchUserAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Account.current();
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.data);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      window.localStorage.removeItem('jwt');
    },
  },
  extraReducers: (builder => {
    builder.addCase(loginAsync.pending, (state) => {
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = state.user.token;
      state.isLoggedIn = !!state.user;
      window.localStorage.setItem('jwt', state.token);
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(registerAsync.pending, (state) => {
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = state.user.token;
      state.isLoggedIn = !!state.user;
      window.localStorage.setItem('jwt', state.token);
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      console.log(action);
    });
    builder.addCase(fetchUserAsync.pending, (state) => {
    });
    builder.addCase(fetchUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = !!state.user;
    });
    builder.addCase(fetchUserAsync.rejected, (state, action) => {
      console.log(action);
    });
  }),
});

export const { logout } = userSlice.actions;