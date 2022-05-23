import { createSlice } from "@reduxjs/toolkit";

interface CommonState {
  error: boolean;
  success: boolean;
  message: string;
}

export const commonSlice = createSlice({
  name: 'common',
  initialState: {
    error: false,
    success: false,
    message: ''
  },
  reducers: {
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
  }
})

export const {showSuccessMessage, showErrorMessage, resetMessage} = commonSlice.actions;
