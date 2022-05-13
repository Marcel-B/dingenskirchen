import { Aquarium } from 'shared-types';
import { Card, Grid } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import FeedItemHeadline from './FeedItemHeadline';

interface Props {
  aquarium: Aquarium;
}

const AquariumFeedItem = ({ ...props }: Props) => {
  return (
    <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeedItemHeadline datum={props.aquarium.datum} text='Aquarium' />
          <div><WaterIcon /> {props.aquarium.name}</div>
          <div>{props.aquarium.liter} Liter</div>
        </Grid>
      </Grid>
    </Card>);
};

export default AquariumFeedItem;