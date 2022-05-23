import { Alert, Box, Divider, Grid, Snackbar, Typography } from '@mui/material';
import MessungListe from '../messung/MessungListe';
import NeueMessungForm from '../messung/NeueMessungForm';
import NeuesAquariumForm from '../aquarium/NeuesAquariumForm';
import AquariumListe from '../aquarium/AquariumListe';
import React from 'react';
import NeueDuengungForm from '../duengung/NeueDuengungForm';
import DuengungListe from '../duengung/DuengungListe';
import NeuerFischForm from '../fisch/NeuerFischForm';
import FischListe from '../fisch/FischListe';
import Feed from '../feed/Feed';
import NeueNotizForm from '../notiz/NeueNotizForm';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { resetMessage } from "../../store/commonSlice";

const Dashboard = () => {
  const {error, success, message} = useAppSelector(state => state.common);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(resetMessage());
  };
  return (
    <>
      {/*
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography variant='h2'>Notizen</Typography>
                <Typography variant='h2'>Düngung</Typography>
                <Typography variant='h2'>Messung</Typography>
            </Box>
*/}
      <Divider orientation='horizontal' sx={{mb: 2}}/>
      <Grid
        container
        spacing={4}>
        <Grid item xs={12}>
          <Feed/>
        </Grid>
        <Grid item xs={12}>
          <FischListe/>
        </Grid>
        <Grid item xs={12}>
          <MessungListe/>
        </Grid>
        <Grid item xs={12}>
          <DuengungListe/>
        </Grid>
        <Grid item xs={6}>
          <AquariumListe/>
        </Grid>
        <Grid item xs={6}>
          <NeuesAquariumForm/>
        </Grid>
      </Grid>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Dashboard;