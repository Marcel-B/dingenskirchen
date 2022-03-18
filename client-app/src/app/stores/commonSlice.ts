import { createSlice } from '@reduxjs/toolkit';

interface Common {
  loadingInitial: boolean;
}

const initialState: Common = {
  loadingInitial: true
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    startLoadingInitial(state){
      state.loadingInitial = true;
    },
    finishLoadingInitial(state){
      state.loadingInitial = false;
    }
  }
});

export const commonActions = commonSlice.actions;