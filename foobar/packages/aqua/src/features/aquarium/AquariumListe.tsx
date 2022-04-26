import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Card, Divider, IconButton, Typography } from '@mui/material';
import {
  aquariumSelectors, deleteAquariumAsync,
  fetchAquarienAsync,
} from '../../store/aquariumSlice';
import DeleteIcon from '@mui/icons-material/Delete';

const AquariumListe = () => {
  const dispatch = useAppDispatch();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  const deleteItem = (id: string | undefined) => {
    if (id)
      dispatch(deleteAquariumAsync(id));
  };

  const columns: GridColDef[] = [
    {
      field: 'id', headerName: ' ', width: 60, editable: false,
      renderCell: (params: GridRenderCellParams<string>) => (
        <>
          <IconButton aria-label='delete' onClick={() => deleteItem(params.value)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    {
      field: 'liter',
      headerName: 'Größe',
      width: 150,
      renderCell: (params: GridRenderCellParams<string>) => (
        <>
          {`${params.value} Liter`}
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, [dispatch]);
  return (
    <Card style={{ padding: '2rem' }}>
      <Typography variant='h5'>Aquarien</Typography>
      <Divider orientation='horizontal' />
      <br />
      <div style={{ height: 400, width: 380 }}>
        <DataGrid initialState={{
          sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
        }} columns={columns}
                  rows={aquarien} rowsPerPageOptions={[5]} pageSize={5}
        />
      </div>
    </Card>);
};

export default AquariumListe;
