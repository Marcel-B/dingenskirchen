import React, { useEffect } from 'react';

import ActivityFilters from './BuchungAside';
import BuchungList from './BuchungList';
import { LoadingComponent } from '../../../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../app/stores/store';
// import Grid from '@mui/material/Grid/Grid';

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
    <div  className='gird-cols-2'>
        <BuchungList />
        <ActivityFilters />
    </div>
  );
};

export default observer(BuchungDashboard);