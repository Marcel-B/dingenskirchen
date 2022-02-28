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
          color={`orange`}
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
      <Header as={'h2'} content='Filter'/>
      <Grid>
        <Grid.Row>
          <Grid.Column>Jan</Grid.Column>
          <Grid.Column>Feb</Grid.Column>
          <Grid.Column>Mrz</Grid.Column>
          <Grid.Column>Aprl</Grid.Column>
          <Grid.Column>Mai</Grid.Column>
          <Grid.Column>Jun</Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>Jul</Grid.Column>
          <Grid.Column>Aug</Grid.Column>
          <Grid.Column>Sep</Grid.Column>
          <Grid.Column>Oktl</Grid.Column>
          <Grid.Column>Nov</Grid.Column>
          <Grid.Column>Dez</Grid.Column>
        </Grid.Row>
      </Grid>
      <Header />

      <Calendar />

    </div>
  );
};
export default ActivityFilters;
