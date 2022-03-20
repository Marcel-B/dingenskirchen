import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { commonSlice } from './commonSlice';
import { buchungenSlice } from './buchungenSlice';
import { userSlice } from './userSlice';
import { modalSlice } from './modalSlice';

export const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    buchungen: buchungenSlice.reducer,
    user: userSlice.reducer,
    modal: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
