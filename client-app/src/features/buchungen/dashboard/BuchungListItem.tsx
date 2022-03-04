// import { Button, Grid, Icon, Label, List, Segment } from 'semantic-ui-react';

import { Buchung } from '../../../app/models/buchung';
import { Link, useNavigate } from 'react-router-dom';
import BuchungBetragItem from './BuchungBetragItem';
import { Chip, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Edit, UpcomingOutlined } from '@mui/icons-material';

interface Props {
  buchung: Buchung;
}

const BuchungListItem = ({ buchung }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2} sx={{ width: '100%', bgColor: 'background.paper' }}>
        <Grid item xs={2}>
          <BuchungBetragItem betrag={buchung.betrag!}
            intervall={buchung.intervall} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" >{buchung.name}</Typography>
          <Typography variant="body2" >{buchung.beschreibung}</Typography>
        </Grid>
        <Grid item xs={3}>
          {buchung.tags.map(tag => (<Chip label={tag.name} key={tag.id} />))}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => navigate(`/app/buchungen/${buchung.id}`)}><Edit /></IconButton>
        </Grid>
      </Grid>
      {/* <Grid >
        <Grid.Column width='4'>
          <List>
            <List.Item key={'ddds'} as={'h3'}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {buchung.kategorie === 2 ? (
                  <Icon name={`arrow alternate circle up`} color='red' />
                ) : (
                  <Icon name={`arrow alternate circle down`} color='green' />
                )}

              </div>
            </List.Item>
            <List.Item key={'ddda'}>
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
        <Grid.Column width='7'>
          <List>
            <List.Item key={buchung.name} as={'h2'}> {buchung.name}</List.Item>
            <List.Item key={buchung.id}> {buchung.beschreibung}</List.Item>
          </List>
        </Grid.Column>
        <Grid.Column width='2'>
          <List>
     
          </List>
        </Grid.Column>
        <Grid.Column width='3' floated='right'>
          <Button
            as={Link}
            to={`/app/buchungen/${buchung.id}`}
            color={`teal`}
            floated={`right`}
            content={`Anzeigen`}
          />
        </Grid.Column>
      </Grid>
    </Segment> */}
    </>
  );
};

export default BuchungListItem;
