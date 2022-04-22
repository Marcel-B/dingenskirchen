import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMessungenAsync, messungenSelectors } from '../../store/messungSlice';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'wert', headerName: 'Wert', width: 150 },
    { field: 'datum', headerName: 'Datum', width: 150 },
    { field: 'typ', headerName: 'Typ', width: 150 },
  ];

  useEffect(() => {
    dispatch(fetchMessungenAsync());
  }, [dispatch]);
  return (
    <>
      <h1>Liste</h1>
      <div style={{ height: 400 }}>
        <DataGrid columns={columns} rows={messungen} />
      </div>
    </>);
};

export default MessungListe;
