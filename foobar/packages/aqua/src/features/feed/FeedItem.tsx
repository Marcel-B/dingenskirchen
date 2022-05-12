import { Feed, Fisch, Notiz, Aquarium, Duengung, Messung } from 'shared-types';
import { format } from 'date-fns';
import { Card, Divider, Grid, Typography } from '@mui/material';

const FeedItem = (props: Feed) => {
  return (
    <Card style={{ padding: '1rem', marginBottom: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography variant='h5'>{format(new Date(props.datum), 'dd.MM.yyyy')}</Typography>
        </Grid>
        <Grid item xs={4} style={{ alignContent: 'end' }}>
          <Typography>{props.aquaType.toUpperCase()}</Typography>
        </Grid>
      </Grid>
      <Divider orientation='horizontal' />
      <br />
      {
        props.aquaType === 'notiz' ? (<p>{(props.item as Notiz).text}</p>) :
          props.aquaType === 'fisch' ? (<p>{(props.item as Fisch).name}</p>) :
            props.aquaType === 'aquarium' ? (<p>{(props.item as Aquarium).name}</p>) :
              props.aquaType === 'duengung' ? (<p>{(props.item as Duengung).duenger}</p>) :
                props.aquaType === 'messung' ? (<p>{(props.item as Messung).wert}</p>) :
                  <p>Unbekannter Eingrag</p>
      }
    </Card>
  );
};

export default FeedItem;