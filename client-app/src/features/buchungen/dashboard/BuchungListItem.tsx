import { Button, Grid, Icon, List, Segment } from 'semantic-ui-react';

import { Buchung } from '../../../app/models/buchung';
import { Link } from 'react-router-dom';
import BuchungBetragItem from './BuchungBetragItem';

interface Props {
  buchung: Buchung;
}

const BuchungListItem = ({ buchung }: Props) => {
  const formatBetrag = (value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return (
    <Segment>
      <Grid>
        <Grid.Column width='4'>
          <List>
            <List.Item as={'h3'}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {buchung.kategorie === 2 ? (
                  <Icon name={`arrow alternate circle up`} color='red' />
                ) : (
                  <Icon name={`arrow alternate circle down`} color='green' />
                )}
               <BuchungBetragItem betrag={buchung.betrag!}
               intervall={buchung.intervall}/>
              </div>
            </List.Item>
            <List.Item>
              {buchung.intervall === 1 ? (
                <Icon name='calendar check outline' />
              ) : buchung.intervall === 2 ? (
                <>
                  <Icon name='sync alternate' /> Monat
                </>
              ) : buchung.intervall === 3 ? (
                <>
                  <Icon name='sync alternate' /> Quartal
                </>
              ) : buchung.intervall === 4 ? (
                <>
                  <Icon name='sync alternate' /> Halbjahr
                </>
              ) : (
                <>
                  <Icon name='sync alternate' /> Jahr
                </>
              )}
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width='8'>
          <List>
            <List.Item as={'h2'}> {buchung.name}</List.Item>
            <List.Item> {buchung.beschreibung}</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width='4' floated='right'>
          <Button
            as={Link}
            to={`/app/buchungen/${buchung.id}`}
            color={`teal`}
            floated={`right`}
            content={`Anzeigen`}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default BuchungListItem;
