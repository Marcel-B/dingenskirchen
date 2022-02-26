import React, { useEffect } from 'react';

import ActivityFilters from './ActivityFilters';
import BuchungList from './BuchungList';
import { Grid } from 'semantic-ui-react';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';

const BuchungDashboard = () => {
  const { buchungStore } = useStore();
  const { loadBuchungen, buchungRegistry } = buchungStore;

  useEffect(() => {
    if (buchungRegistry.size <= 1) {
      loadBuchungen().catch((error) => console.log(error));
    }
  }, [buchungRegistry.size, loadBuchungen]);

  if (buchungStore.loadingInitial)
    return <LoadingComponent content={`Bitte warten...`} />;

  return (
    <Grid style={{ marginTop: '7em' }}>
      <Grid.Column width='10'>
        <BuchungList />
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
};

export default observer(BuchungDashboard);
