import React, { useEffect } from 'react';

import ActivityFilters from './BuchungAside';
import BuchungList from './BuchungList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
import Grid from '@mui/material/Grid/Grid';
import { RootState, useAppDispatch } from '../../../app/stores';
import agent from '../../../app/api/agent';
import { buchungenActions } from '../../../app/stores/buchungenSlice';
import { useSelector } from 'react-redux';

const BuchungDashboard = () => {
  const dispatch = useAppDispatch();
  const buchungen = useSelector((store: RootState) => store.buchungen);
  const { buchungStore } = useStore();

  useEffect(() => {
    if (buchungen.buchungen.length === 0) {
      agent.Buchungen.list()
        .then(buchungen => dispatch(buchungenActions.add(buchungen)));
    }
  }, [buchungen.buchungen.length, dispatch]);

  if (buchungStore.loadingInitial)
    return <LoadingComponent />;

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

export default observer(BuchungDashboard);
