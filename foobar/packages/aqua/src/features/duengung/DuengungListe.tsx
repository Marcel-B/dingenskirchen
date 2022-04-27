import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Card, Divider, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { duengungenSelectors, fetchDuengungenAsync } from '../../store/duengungSlice';

const DuengungListe = () => {
  const dispatch = useAppDispatch();
  const duengungen = useAppSelector(duengungenSelectors.selectAll);

  const deleteItem = (id: string | undefined) => {
    if (id) {
      // dispatch(deleteDuengung(id));
    }
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
    }, {
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
  ];

  useEffect(() => {
    dispatch(fetchDuengungenAsync());
  }, [dispatch]);

  return (
    <Card style={{ padding: '2rem' }}>
      <Typography variant='h5'>Düngung</Typography>
      <Divider orientation='horizontal' />
      <br />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid initialState={{
          sorting: { sortModel: [{ field: 'name', sort: 'asc' }] },
        }} columns={columns}
                  rows={duengungen}
                  rowsPerPageOptions={[5]}
                  pageSize={5}
        />
      </div>
    </Card>);
};

export default DuengungListe;
