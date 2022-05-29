import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Card, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteNotizAsync, fetchNotizenAsync, notizSelectors, updateNotiz } from "./notizSlice";

const NotizListe = () => {
  const dispatch = useAppDispatch();
  const notizen = useAppSelector(notizSelectors.selectAll);

  const handleDeleteItem = (id: string | undefined) => {
    if (id) {
      dispatch(deleteNotizAsync(id));
    }
  };

  const handleUpdateItem = (id: string | undefined) => {
    if (id) {
      dispatch(updateNotiz(id));
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'datum',
      headerName: 'Datum',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => format(new Date(params.value), 'dd.MM.yyyy'),
    },
    {
      field: 'text',
      headerName: 'Text',
      width: 150,
    },
    {
      field: 'tag',
      headerName: 'Tag',
      width: 150,
      editable: false,
    },
    {
      field: 'aquarium',
      headerName: 'Aquarium',
      width: 150,
    },
    {
      field: 'id',
      headerName: ' ',
      editable: false,
      renderCell: (params: GridRenderCellParams<string>) => (
        <>
          <IconButton aria-label='delete' onClick={() => handleUpdateItem(params.value)}>
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
    dispatch(fetchNotizenAsync());
  }, [dispatch]);

  return (
    <Card style={{padding: '2rem'}}>
      <Typography variant='h5'>Notizen</Typography>
      <Divider orientation='horizontal'/>
      <br/>
      <div style={{height: 400, width: '100%'}}>
        <DataGrid initialState={{
          sorting: {sortModel: [{field: 'datum', sort: 'desc'}]},
        }} columns={columns}
                  rows={notizen.map(r => {
                    return {...r, aquarium: r.aquarium.name};
                  })}
                  rowsPerPageOptions={[5]}
                  pageSize={5}
        />
      </div>
    </Card>);
};

export default NotizListe;
