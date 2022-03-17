import { Buchung } from '../models/buchung';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Buchungen {
  buchungen: Buchung[];
}

const initialState: Buchungen = {
  buchungen: [],
};

/*
export const fetchBuchungen  = () =>  {
  return (dispatch) => {
   const fetchData = async () => {
     const data = await agent.Buchungen.list();
     return data;
   };
  };
  try{
    fet
  }
};
*/

export const buchungenSlice = createSlice({
  name: 'buchungen',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Buchung[]>){
      state.buchungen = action.payload;
    }
  },
});



export const buchungenActions = buchungenSlice.actions;