import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMessungenAsync, messungenSelectors } from '../../store/messungSlice';

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll);

  useEffect(() => {
    dispatch(fetchMessungenAsync());
  }, [dispatch]);
  return (
    <>
      <h1>Liste</h1>
      <ul>
        {
          messungen.map((m, idx) => <li key={m.id}>{m.wert}</li>)
        }
      </ul>
    </>);
};

export default MessungListe;
