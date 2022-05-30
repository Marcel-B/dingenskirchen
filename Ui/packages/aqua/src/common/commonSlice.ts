import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import StatusType from "../models/statusType";
import { store } from "../store/store";
import { getCurrentUserAsync } from "./user/userSlice";

interface CommonState {
  error: boolean;
  success: boolean;
  message: string;
  status: StatusType;
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    error: false,
    success: false,
    message: '',
    status: StatusType.Idle
  } as CommonState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    showSuccessMessage: (state, action) => {
      state.message = action.payload;
      state.success = true;
    },
    resetMessage: (state) => {
      state.message = '';
      state.success = false;
      state.error = false;
    },
    showErrorMessage: (state, action) => {
      state.message = action.payload;
      state.error = true;
    },
  },
})

export const {showSuccessMessage, showErrorMessage, resetMessage, setStatus} = commonSlice.actions;
