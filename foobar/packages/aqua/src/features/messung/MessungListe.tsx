import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMessungenAsync, messungenSelectors } from '../../store/messungSlice';
import { DataGrid, GridColDef, GridValueFormatterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Card, Divider, Typography } from '@mui/material';

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll);
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      editable: false,
      hideable: true,
    },
    {
      field: 'datum',
      headerName: 'Datum',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => format(new Date(params.value), 'dd.MM.yyyy'),
    },
    {
      field: 'wert',
      headerName: 'Wert',
      width: 150,
    },
    {
      field: 'menge',
      headerName: 'Menge',
      width: 150,
      editable: false,
      valueFormatter: (params: GridValueFormatterParams<number>) => new Intl.NumberFormat('de-DE', {
        style: 'unit',
        unit: 'milliliter',
      }).format(params?.value),
    },
    {
      field: 'aquarium',
      headerName: 'Aquarium',
      width: 150,
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid initialState={{
          sorting: { sortModel: [{ field: 'datum', sort: 'desc' }] },
          columns: { columnVisibilityModel: { id: false } },
        }} columns={columns}
                  rows={messungen}
                  rowsPerPageOptions={[5]}
                  pageSize={5}
        />
      </div>
    </Card>);
};

export default MessungListe;
