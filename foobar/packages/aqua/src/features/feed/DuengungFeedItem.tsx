import { Duengung } from 'shared-types';
import { Card, Grid } from '@mui/material';
import FeedItemHeadline from './FeedItemHeadline';

interface Props {
  duengung: Duengung;
}

const DuengungFeedItem = ({ ...props }: Props) => {
  return (
    <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeedItemHeadline datum={props.duengung.datum} text='Düngung' />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div>Dünger: {props.duengung.duenger}</div>
              <div>Menge: {props.duengung.menge} ml</div>
            </div>
            <div>{props.duengung.aquarium.name}</div>
          </div>
        </Grid>
      </Grid>
    </Card>);
};

export default DuengungFeedItem;