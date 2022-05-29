import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Card, Divider, IconButton, Typography } from '@mui/material';
import {
  aquariumSelectors, deleteAquariumAsync, editAquarium,
  fetchAquarienAsync,
} from './aquariumSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AquariumListe = () => {
  const dispatch = useAppDispatch();
  const aquarien = useAppSelector(aquariumSelectors.selectAll);

  const handleDeleteItem = (id: string | undefined) => {
    if (id)
      dispatch(deleteAquariumAsync(id));
  };

  const handleEditItem = (id: string | undefined) => {
    if (id)
      dispatch(editAquarium(id));
  }

  const columns: GridColDef[] = [{
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: false,
  }, {
    field: 'liter',
    headerName: 'Größe',
    width: 150,
    renderCell: (params: GridRenderCellParams<string>) => (
      <>
        {`${params.value} Liter`}
      </>
    ),
  }, {
    field: 'id', headerName: ' ', editable: false,
    renderCell: (params: GridRenderCellParams<string>) => (
      <>
        <IconButton aria-label='edit' onClick={() => handleEditItem(params.value)}>
          <EditIcon color='info'/>
        </IconButton>
        <IconButton aria-label='delete' onClick={() => handleDeleteItem(params.value)}>
          <DeleteIcon color='error'/>
        </IconButton>
      </>
    ),
  },
  ];

  useEffect(() => {
    dispatch(fetchAquarienAsync());
  }, [dispatch]);

  return (
    <Card style={{padding: '2rem'}}>
      <Typography variant='h5'>Aquarien</Typography>
      <Divider orientation='horizontal'/>
      <br/>
      <div style={{height: 400, width: 'auto'}}>
        <DataGrid initialState={{
          sorting: {sortModel: [{field: 'name', sort: 'asc'}]},
        }} columns={columns} rows={aquarien} rowsPerPageOptions={[5]} pageSize={5}
        />
      </div>
    </Card>);
};

export default AquariumListe;
