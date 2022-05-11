import { Grid } from '@mui/material';
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

const Dashboard = () => {
  return (
    <Grid
      container
      spacing={4}>
      <Grid item xs={12}>
        <Feed />
      </Grid>
      <Grid item xs={8}>
        <MessungListe />
      </Grid>
      <Grid item xs={4}>
        <NeueMessungForm />
      </Grid>
      <Grid item xs={8}>
        <DuengungListe />
      </Grid>
      <Grid item xs={4}>
        <NeueDuengungForm />
      </Grid>
      <Grid item xs={8}>
        <AquariumListe />
      </Grid>
      <Grid item xs={4}>
        <NeuesAquariumForm />
      </Grid>
      <Grid item xs={12}>
        <FischListe />
      </Grid>
      <Grid item xs={6}>
        <NeuerFischForm />
      </Grid>
      <Grid item xs={6}>
        <NeueNotizForm />
      </Grid>
    </Grid>
  );
};

export default Dashboard;