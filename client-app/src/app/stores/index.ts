import { configureStore } from '@reduxjs/toolkit';
import { buchungSlice } from './buchungSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { commonSlice } from './commonSlice';
import { buchungenSlice } from './buchungenSlice';

export const store = configureStore({
  reducer: {
    buchung: buchungSlice.reducer,
    common: commonSlice.reducer,
    buchungen: buchungenSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
