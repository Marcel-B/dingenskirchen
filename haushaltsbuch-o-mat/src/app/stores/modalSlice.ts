import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  body: string | null;
}

const initialState: ModalState = {
  open: false,
  body: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.body = action.payload;
    },
    closeModal: (state) => {
      state.open = false;
      state.body = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;