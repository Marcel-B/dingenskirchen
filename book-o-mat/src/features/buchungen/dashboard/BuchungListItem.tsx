import {Buchung} from '../../../app/models/buchung';
import { useNavigate } from 'react-router-dom';
import BuchungBetragItem from './BuchungBetragItem';
// import {Chip, Divider, Grid, IconButton, Stack, Typography} from '@mui/material';
// import {Edit, Autorenew, ArrowCircleUp, ArrowCircleDown, EventAvailable} from '@mui/icons-material';

interface Props {
  buchung: Buchung;
}
const ItemInfo = ({buchung}: Props) => {
  return (
    <div className='flex'>
      {/* <Grid item xs={8}>
        <Stack direction='column'>
          {buchung.intervall === 1 ? (
            <EventAvailable/>
          ) : buchung.intervall === 2 ? (
            <>
              <Stack direction='row'>
                <Autorenew/> Monat
              </Stack>
            </>
          ) : buchung.intervall === 3 ? (
            <>
              <Stack direction='row'>
                <Autorenew/> Quartal
              </Stack>
            </>
          ) : buchung.intervall === 4 ? (
            <>
              <Stack direction='row'>
                <Autorenew/> Halbjahr
              </Stack>
            </>
          ) : (
            <>
              <Stack direction='row'>
                <Autorenew/> Jahr
              </Stack>
            </>
          )}
          <BuchungBetragItem betrag={buchung.betrag!}
                             intervall={buchung.intervall}/>
        </Stack>
      </Grid> */}
    </div>
  );
}

const BuchungListItem = ({ buchung }: Props) => {
  const navigate = useNavigate();
  return (
    <>
    {buchung.name}
      {/* <Divider sx={{mt: 1}}/>
      <Grid container spacing={2} sx={{width: '100%', bgColor: 'background.paper', mt: 1, mb: 1}}>
        <Grid item xs={2}>
          <ItemInfo buchung={buchung}/>
        </Grid>
        < Grid item xs={6}>
          <Typography variant="h6">{buchung.name}</Typography>
          <Typography variant="body1">{buchung.beschreibung}</Typography>
        </Grid>
        <Grid item xs={3}>
          {buchung.tags.map(tag => (<Chip label={tag.name} key={tag.id}/>))}
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={() => navigate(`/app/buchungen/${buchung.id}`)}><Edit/></IconButton>
        </Grid>
      </Grid> */}
    </>
  );
};

export default BuchungListItem;
