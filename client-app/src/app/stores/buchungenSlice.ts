import { Buchung } from '../models/buchung';
import { createSlice } from '@reduxjs/toolkit';
import agent from '../api/agent';

interface Buchungen {
  buchungen: Buchung[];
}

const initialState: Buchungen = {
  buchungen: [],
};

/*export const fetchBuchungen  = () =>  {
  return (dispatch) => {
   const fetchData = async () => {
     const data = await agent.Buchungen.list();
     return data;
   };
  };
  try{
    fet
  }
};*/

export const buchungenSlice = createSlice({
  name: 'buchungen',
  initialState,
  reducers: {},
});

