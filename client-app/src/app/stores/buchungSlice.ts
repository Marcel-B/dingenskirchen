import { createSlice } from '@reduxjs/toolkit';
import { Buchung } from '../models/buchung';

interface BuchungState {
  buchung: Buchung | null;
}

const initialState: BuchungState = {
  buchung: null,
  /*
    id: '',
    betrag: null,
    name: '',
    beschreibung: '',
    zeitpunkt: null,
    kategorie: null,
    intervall: null,
    tags: []
  */
};

export const buchungSlice = createSlice({
  name: 'buchung',
  initialState,
  reducers: {
    setBuchung: (state, action) => {
      state.buchung = action.payload;
    },
    setKategorie: (state, action) => {
      const { kategorie } = action.payload;
      state.buchung!.kategorie = kategorie;
    },
  },
});

export const { setBuchung, setKategorie } = buchungSlice.actions;