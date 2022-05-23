import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { messungSlice } from '../features/messung/messungSlice';
import { aquariumSlice } from '../features/aquarium/aquariumSlice';
import { duengungSlice } from '../features/duengung/duengungSlice';
import { fischSlice } from '../features/fisch/fischSlice';
import { notizSlice } from '../features/notiz/notizSlice';
import { tagSlice } from './tagSlice';
import { feedSlice } from '../features/feed/feedSlice';
import { commonSlice } from "./commonSlice";

export const store = configureStore({
  reducer: {
    messungen: messungSlice.reducer,
    aquarien: aquariumSlice.reducer,
    duengungen: duengungSlice.reducer,
    fische: fischSlice.reducer,
    notizen: notizSlice.reducer,
    tags: tagSlice.reducer,
    feed: feedSlice.reducer,
    common: commonSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
