import React, { useEffect } from 'react';
import ActivityFilters from './BuchungAside';
import BuchungList from './BuchungList';
import Grid from '@mui/material/Grid/Grid';

const BuchungDashboard = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <BuchungList />
      </Grid>
      <Grid item xs={4}>
        <ActivityFilters />
      </Grid>
    </Grid>
  );
};

export default BuchungDashboard;
