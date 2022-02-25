import React from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import BuchungList from './BuchungList';

export default observer(function BuchungDashboard() {
  // const { buchungStore } = useStore();
  // const { loadBuchungen, buchungRegistry } = buchungStore;
  //
  // useEffect(() => {
  //   if (buchungRegistry.size <= 1) {
  //     loadBuchungen().catch((error) => console.log(error));
  //   }
  // }, [buchungRegistry.size, loadBuchungen]);
  //
  // if (buchungStore.loadingInitial)
  //   return <LoadingComponent content={`Bitte warten...`} />;

  return (
    <Grid>
      <Grid.Column width='10'>
        <BuchungList />
      </Grid.Column>
      <Grid.Column width='6'>
      </Grid.Column>
    </Grid>
  );
});
