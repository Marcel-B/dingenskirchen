import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserFormValues } from "shared-types";
import agent from "../agent";
import StatusType from "../../models/statusType";
import statusType from "../../models/statusType";

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  loginUser: boolean;
  registerUser: boolean;
  token: string | null;
  status: StatusType;
}

export const loginUserAsync = createAsyncThunk<User, UserFormValues>(
  'user/loginUserAsync',
  async (userFormValues, thunkAPI) => {
    try {
      return await agent.Account.login(userFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  }
);

export const registerUserAsync = createAsyncThunk<User, UserFormValues>(
  'user/registerUserAsync',
  async (userFormValues, thunkAPI) => {
    try {
      return await agent.Account.register(userFormValues);
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  }
);

export const getCurrentUserAsync = createAsyncThunk<User>(
  'user/getCurrentUserAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Account.current();
    } catch (e: any) {
      return thunkAPI.rejectWithValue({error: e.data});
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loginUser: false,
    isLoggedIn: false,
    registerUser: false,
    status: StatusType.Idle,
    token: window.localStorage.getItem('jwt')
  } as UserState,
  reducers: {
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
      state.registerUser = false;
    },
    setRegisterUser: (state, action) => {
      state.registerUser = action.payload;
      state.loginUser = false;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem('jwt', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
      window.localStorage.removeItem('jwt');
    }
  },
  extraReducers: (builder => {
    builder.addCase(loginUserAsync.pending, (state) => {
      state.status = statusType.Loading;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.status = statusType.Error;

    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      window.localStorage.setItem('jwt', state.token);
      state.status = statusType.Idle;
    });
    builder.addCase(registerUserAsync.pending, (state) => {
      state.status = statusType.Loading;
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.status = statusType.Error;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.status = statusType.Idle;
      window.localStorage.setItem('jwt', state.token);
    });
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.status = statusType.Loading;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.user = null;
      state.isLoggedIn = false;
      state.status = statusType.Error;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.status = statusType.Idle;
      window.localStorage.setItem('jwt', state.token);
    })
  })
});

export const {setLoginUser, setRegisterUser, logout} = userSlice.actions;