import { Fisch } from 'shared-types';
import { Card, Grid } from '@mui/material';
import FeedItemHeadline from './FeedItemHeadline';

interface Props {
  fisch: Fisch;
}

const FischFeedItem = ({ ...props }: Props) => {
  return (
    <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeedItemHeadline datum={props.fisch.datum} text='Fisch' />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div>{props.fisch.name}</div>
              <div>{props.fisch.wissenschaftlich}</div>
            </div>
            <div>
              <div>{props.fisch.aquarium.name}</div>
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>);
};

export default FischFeedItem;