import { Button, Grid, Icon, List } from 'semantic-ui-react';
import React, { SyntheticEvent, useState } from 'react';

import { Buchung } from '../../../app/models/buchung';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useStore } from '../../../app/stores/store';

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
    <Grid>
      <Grid.Column width='4'>
        <List>
          <List.Item as={'h2'}>
            <span>
              <Icon name={`calendar alternate outline`} />{' '}
              {format(buchung.zeitpunkt!, 'dd. MMM yyyy')}
            </span>
          </List.Item>
          <List.Item as={'h3'}>{formatBetrag(buchung.betrag!)}</List.Item>
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
  );
};

export default BuchungListItem;
