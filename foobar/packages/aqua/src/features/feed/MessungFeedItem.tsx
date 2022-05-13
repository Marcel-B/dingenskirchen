import { Messung } from 'shared-types';
import { Card, Grid } from '@mui/material';
import FeedItemHeadline from './FeedItemHeadline';

interface Props {
  messung: Messung;
}

const MessungFeedItem = ({ ...props }: Props) => {
  return (
    <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeedItemHeadline datum={props.messung.datum} text='Messung' />
          <div>{props.messung.aquarium.name}</div>
          <div>{props.messung.wert}</div>
          <div>{props.messung.menge}</div>
        </Grid>
      </Grid>
    </Card>);
};

export default MessungFeedItem;