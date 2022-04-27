import { Grid } from '@mui/material';
import MessungListe from '../messung/MessungListe';
import NeueMessungForm from '../messung/NeueMessungForm';
import NeuesAquariumForm from '../aquarium/NeuesAquariumForm';
import AquariumListe from '../aquarium/AquariumListe';
import React from 'react';
import NeueDuengungForm from '../duengung/NeueDuengungForm';
import DuengungListe from '../duengung/DuengungListe';

const Dashboard = () => {
  return (
    <Grid
      container
      spacing={2}>
      <Grid item xs={6}>
        <MessungListe />
      </Grid>
      <Grid item xs={6}>
        <DuengungListe />
      </Grid>
      <Grid item xs={4}>
        <NeueMessungForm />
      </Grid>
      <Grid item xs={4}>
        <NeueDuengungForm />
      </Grid>
      <Grid item xs={4}>
        <NeuesAquariumForm />
      </Grid>
      <Grid item xs={5}>
        <AquariumListe />
      </Grid>
    </Grid>
  );
};

export default Dashboard;