import React, { useEffect } from 'react';
import { Messung } from 'shared-types';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMessungenAsync, messungenSelectors } from '../../store/messungSlice';

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll) as Messung[];

  useEffect(() => {
    dispatch(fetchMessungenAsync());
  }, []);
  return (<><h1>Liste</h1>{messungen.map(m => <p>{m.wert}</p>)}</>);
};

export default MessungListe;
