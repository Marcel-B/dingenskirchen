import { Notiz } from 'shared-types';
import { Card, Grid } from '@mui/material';
import FeedItemHeadline from './FeedItemHeadline';

interface Props {
  notiz: Notiz;
}

const NotizFeedItem = ({ ...props }: Props) => {
  return (
    <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeedItemHeadline datum={props.notiz.datum} text='Notiz' />
          <div>{props.notiz.aquarium.name}</div>
          <div>{props.notiz.text}</div>
          <div>{props.notiz.tag}</div>
        </Grid>
      </Grid>
    </Card>);
};

export default NotizFeedItem;