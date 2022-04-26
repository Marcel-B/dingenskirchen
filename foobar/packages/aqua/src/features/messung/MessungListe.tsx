import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMessungenAsync, messungenSelectors } from '../../store/messungSlice';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import messungTypeOptions from '../../models/messungTyp';
import { Card, Divider, Typography } from '@mui/material';
import { aquariumSelectors } from '../../store/aquariumSlice';

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll);
  const aquarien = useAppSelector(aquariumSelectors.selectAll);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      editable: false,
      hideable: true,
    },
    {
      field: 'wert',
      headerName: 'Wert',
      width: 150,
      editable: false,
    },
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
      valueFormatter: (params: GridValueFormatterParams<number>) => messungTypeOptions.find(m => m.value === params.value)?.text ?? '-',
    },
    {
      field: 'aquarium',
      headerName: 'Aquarium',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => aquarien.find(m => m.id === params.value)?.name ?? '-',
    },
  ];

  useEffect(() => {
    dispatch(fetchMessungenAsync());
  }, [dispatch]);
  return (
    <Card style={{ padding: '2rem' }}>
      <Typography variant='h5'>Messungen</Typography>
      <Divider orientation='horizontal' />
      <br />
      <div style={{ height: 400, maxWidth: 800, minWidth: 620 }}>
        <DataGrid initialState={{
          sorting: { sortModel: [{ field: 'datum', sort: 'desc' }] },
          columns: { columnVisibilityModel: { id: false } },
        }} columns={columns}
                  rows={messungen} rowsPerPageOptions={[5]} pageSize={5}
        />
      </div>
    </Card>);
};

export default MessungListe;
