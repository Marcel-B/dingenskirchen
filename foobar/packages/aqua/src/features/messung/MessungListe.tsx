import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMessungenAsync, messungenSelectors } from '../../store/messungSlice';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import messungTypeOptions from '../../models/messungTyp';

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, editable: false, hideable: true },
    { field: 'wert', headerName: 'Wert', width: 150, editable: false },
    {
      field: 'datum',
      headerName: 'Datum',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => format(new Date(params.value), 'dd.MM.yyyy'),
    },
    {
      field: 'typ',
      headerName: 'Typ',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => messungTypeOptions.find(m => m.value === params.value)?.text ?? "n/a",
    },
  ];

  useEffect(() => {
    dispatch(fetchMessungenAsync());
  }, [dispatch]);
  return (
    <>
      <h1>Messungen</h1>
      <div style={{ height: 400 }}>
        <DataGrid initialState={{
          sorting: { sortModel: [{ field: 'datum', sort: 'desc' }] },
          columns: { columnVisibilityModel: { id: false } },
        }} columns={columns}
                  rows={messungen} rowsPerPageOptions={[5]} pageSize={5}
        />
      </div>
    </>);
};

export default MessungListe;
