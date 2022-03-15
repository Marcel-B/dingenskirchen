import { createSlice } from '@reduxjs/toolkit';
import { Buchung } from '../models/buchung';


const initialState: Buchung = {
  id: '',
  betrag: null,
  name: '',
  beschreibung: '',
  zeitpunkt: null,
  kategorie: null,
  intervall: null,
  tags: []
}

export const buchungSlice = createSlice({
  name: 'buchung',
  initialState,
  reducers: {

  }
})