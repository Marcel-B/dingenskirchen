import { Card, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deleteFischAsync, fetchFischeAsync, fischeSelectors } from '../../store/fischSlice';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

const FischListe = () => {
  const dispatch = useAppDispatch();
  const fische = useAppSelector(fischeSelectors.selectAll);

  const deleteItem = (id: string | undefined) => {
    if (id) {
      dispatch(deleteFischAsync(id));
    }
  };

  useEffect(() => {
    dispatch(fetchFischeAsync());
  }, [dispatch]);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 220 },
    { field: 'geschlecht', headerName: 'G' },
    { field: 'anzahl', headerName: 'Anzahl' },
    { field: 'herkunft', headerName: 'Herkunft' },
    {
      field: 'ph',
      headerName: 'PH-Wert',
      valueFormatter: params => `${params.value.von}-${params.value.bis}`,
    },
    {
      field: 'gh',
      headerName: 'Gesamthärte',
      valueFormatter: params => `${params.value.von}-${params.value.bis}°dH`,
    },
    {
      field: 'kh',
      headerName: 'Karbonhärte',
      valueFormatter: params => `${params.value.von}-${params.value.bis}°dH`,
    },
    {
      field: 'temperatur',
      headerName: 'Temperatur',
      valueFormatter: params => `${params.value.von}-${params.value.bis}°C`,
    },
    { field: 'wissenschaftlich', headerName: 'Wissenschaftlich', width: 220 },
    {
      field: 'id',
      headerName: ' ',
      renderCell: (params: GridRenderCellParams<string>) => (
        <>
          <IconButton aria-label='delete' onClick={() => deleteItem(params.value)}>
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label='edit' onClick={() => console.log('Edit Click', params.value)}>
            <ModeEditIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Card style={{ padding: '2rem' }}>
        <Typography variant='h5'>Fische</Typography>
        <Divider orientation='horizontal' />
        <br />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid initialState={{
            sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
          }} columns={columns}
                    rows={fische} rowsPerPageOptions={[5]} pageSize={5}
          />
        </div>
      </Card>
    </>
  );
};

export default FischListe;
