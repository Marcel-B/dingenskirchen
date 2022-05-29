import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { deleteMessungAsync, fetchMessungenAsync, messungenSelectors, updateMessung } from './messungSlice';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { Card, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const MessungListe = () => {
  const dispatch = useAppDispatch();
  const messungen = useAppSelector(messungenSelectors.selectAll);

  const handleDeleteItem = (id: string | undefined) => {
    if (id) {
      dispatch(deleteMessungAsync(id));
    }
  };

  const handleUpdateItem = (id: string | undefined) => {
    if (id) {
      dispatch(updateMessung(id));
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
      field: 'wert',
      headerName: 'Wert',
      width: 150,
    },
    {
      field: 'menge',
      headerName: 'Menge',
      width: 150,
      editable: false,
      valueFormatter: (params: GridValueFormatterParams<number>) => new Intl.NumberFormat('de-DE', {maximumFractionDigits: 2}).format(params?.value) + ``,
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
          <IconButton aria-label='edit' onClick={() => handleUpdateItem(params.value)}>
            <ModeEditIcon color='info'/>
          </IconButton>
          <IconButton aria-label='delete' onClick={() => handleDeleteItem(params.value)}>
            <DeleteIcon color='error'/>
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchMessungenAsync());
  }, [dispatch]);
  return (
    <Card style={{padding: '2rem'}}>
      <Typography variant='h5'>Messungen</Typography>
      <Divider orientation='horizontal'/>
      <br/>
      <div style={{height: 400, width: '100%'}}>
        <DataGrid initialState={{
          sorting: {sortModel: [{field: 'datum', sort: 'desc'}]},
        }} columns={columns}
                  rows={messungen.map(r => {
                    return {...r, aquarium: r.aquarium.name};
                  })}
                  rowsPerPageOptions={[5]}
                  pageSize={5}
        />
      </div>
    </Card>);
};

export default MessungListe;
