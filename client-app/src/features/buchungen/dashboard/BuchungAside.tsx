import { Grid, Header, Menu } from 'semantic-ui-react';

import Calendar from 'react-calendar';
import { useStore } from '../../../app/stores/store';

const ActivityFilters = () => {
  const { buchungStore } = useStore();
  const formatBetrag = (value: number | null) => {
    if (!value) return value;
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };
  return (
    <div style={{ position: 'fixed', width: '28%' }}>
      <Menu
        vertical
        size={`large`}
        style={{ width: '100%', marginTop: '9.3em' }}>
        <Header
          icon={`euro sign`}
          attached
          color={`teal`}
          content={`Übersicht`}
        />
        <Menu.Item>
          <Grid columns={2} divided>
            <Grid.Column width={10}>Einnahmen monatlich</Grid.Column>
            <Grid.Column width={6} floated='right' textAlign='right'>
              {formatBetrag(buchungStore.einnahmenGesamt)}
            </Grid.Column>
          </Grid>
        </Menu.Item>
        <Menu.Item>
          <Grid columns={2} divided>
            <Grid.Column width={10}>Ausgaben monatlich</Grid.Column>
            <Grid.Column width={6} floated='right' textAlign='right'>
              {formatBetrag(buchungStore.ausgabenNurMonatlich)}
            </Grid.Column>
          </Grid>
        </Menu.Item>
        <Menu.Item>
          <Grid columns={2} divided>
            <Grid.Column width={10}>Ausgaben monatlich verrechnet</Grid.Column>
            <Grid.Column width={6} floated='right' textAlign='right'>
              {formatBetrag(buchungStore.ausgabenGesamt)}
            </Grid.Column>
          </Grid>
        </Menu.Item>
        <Menu.Item>
          <Grid columns={2} divided>
            <Grid.Column width={10}>Rest monatlich</Grid.Column>
            <Grid.Column width={6} floated='right' textAlign='right'>
              {formatBetrag(buchungStore.restMonatlich)}
            </Grid.Column>
          </Grid>
        </Menu.Item>
        <Menu.Item>
          <Grid columns={2} divided>
            <Grid.Column width={10}>Rest monatlich verrechnet</Grid.Column>
            <Grid.Column width={6} floated='right' textAlign='right'>
              {formatBetrag(buchungStore.restMonatlichVerrechnet)}
            </Grid.Column>
          </Grid>
        </Menu.Item>
      </Menu>
      <Header />
      <Calendar />
    </div>
  );
};
export default ActivityFilters;
