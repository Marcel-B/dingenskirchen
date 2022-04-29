import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { messungSlice } from './messungSlice';
import { aquariumSlice } from './aquariumSlice';
import { duengungSlice } from './duengungSlice';
import { fischSlice } from './fischSlice';

export const store = configureStore({
  reducer: {
    messungen: messungSlice.reducer,
    aquarien: aquariumSlice.reducer,
    duengungen: duengungSlice.reducer,
    fische: fischSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
