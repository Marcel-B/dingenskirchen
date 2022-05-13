import { Notiz } from 'shared-types';
import { Card, Chip, Grid } from '@mui/material';
import FeedItemHeadline from './FeedItemHeadline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface Props {
  notiz: Notiz;
}

const NotizFeedItem = ({ ...props }: Props) => {
  return (
    <Card style={{ padding: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FeedItemHeadline datum={props.notiz.datum} text='Notiz' />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <Chip style={{ marginBottom: '1rem' }} label={props.notiz.tag} />
              <div>{props.notiz.text}</div>
            </div>
            <div>
              <div>{props.notiz.aquarium.name}</div>
              <OpenInNewIcon />
            </div>
          </div>
        </Grid>
      </Grid>
    </Card>);
};

export default NotizFeedItem;