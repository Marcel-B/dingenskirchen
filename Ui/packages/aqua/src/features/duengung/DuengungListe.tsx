import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { Card, Divider, IconButton, Typography } from '@mui/material';
import {
  deleteDuengungAsync,
  duengungenSelectors,
  fetchDuengungenAsync,
  updateDuengung,
} from './duengungSlice';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const DuengungListe = () => {
  const dispatch = useAppDispatch();
  const duengungen = useAppSelector(duengungenSelectors.selectAll);

  const handleDeleteItem = (id: string | undefined) => {
    if (id) {
      dispatch(deleteDuengungAsync(id));
    }
  };

  const handleUpdateItem = (id: string | undefined) => {
    if (id) {
      dispatch(updateDuengung(id));
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'datum',
      headerName: 'Datum',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<string>) => format(new Date(params.value), 'dd.MM.yyyy'),
    },
    {
      field: 'duenger',
      headerName: 'Dünger',
      width: 150,
      editable: false,
    }, {
      field: 'menge',
      headerName: 'Menge',
      width: 150,
      renderCell: (params: GridRenderCellParams<number>) => (
        <>
          {`${params.value} ml`}
        </>
      ),
    }, {
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
    dispatch(fetchDuengungenAsync());
  }, [dispatch]);

  return (
    <Card style={{padding: '2rem'}}>
      <Typography variant='h5'>Düngung</Typography>
      <Divider orientation='horizontal'/>
      <br/>
      <div style={{height: 400, width: '100%'}}>
        <DataGrid initialState={{
          sorting: {sortModel: [{field: 'name', sort: 'asc'}]},
        }} columns={columns}
                  rows={duengungen.map(d => {
                    return {...d, aquarium: d.aquarium.name};
                  })}
                  rowsPerPageOptions={[5]}
                  pageSize={5}
        />
      </div>
    </Card>);
};

export default DuengungListe;
