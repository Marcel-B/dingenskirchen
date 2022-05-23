import { Fisch } from 'shared-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SetMealIcon from '@mui/icons-material/SetMeal';
import { green } from "@mui/material/colors";
import { fisch } from "../fisch/fischStyle";

interface Props {
  fisch: Fisch;
  datum: string;
}

const FischFeedItem = ({datum, ...props}: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}>
        <SetMealIcon sx={{color: fisch}}/>
        <Typography sx={{width: '50%', flexGrow: 2, ml: 1}}>Fisch</Typography>
        <Chip label={props.fisch.aquarium.name} variant='outlined'/>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='h5'>{props.fisch.name}</Typography>
        <Typography variant='subtitle1'>Allgemein</Typography>
        <Divider orientation='horizontal'/>
        <Grid container spacing={2} sx={{mb: 2}}>
          <Grid item xs={3} md={3}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>Wissenschaftlich:</Typography>
          </Grid>
          <Grid item xs={5} md={5}>
            <Typography variant='body2'>{props.fisch.wissenschaftlich}</Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>Anzahl:</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography variant='body2'>{props.fisch.anzahl}</Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>Herkunft:</Typography>
          </Grid>
          <Grid item xs={5} md={5}>
            <Typography variant='body2'>{props.fisch.herkunft}</Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>Geschlecht:</Typography>
          </Grid>
          <Grid item xs={1} md={1}>
            <Typography variant='body2'>{props.fisch.geschlecht}</Typography>
          </Grid>
        </Grid>
        <Typography variant='subtitle1'>Haltung</Typography>
        <Divider orientation='horizontal'/>
        <Grid container spacing={2}>
          <Grid item xs={2} md={2}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>PH:</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant='body2'>{props.fisch.ph.von}-{props.fisch.ph.bis}</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>KH:</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography
              variant='body2'>{props.fisch.kh.von}-{props.fisch.kh.bis}{props.fisch.kh.einheit}</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>GH:</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography
              variant='body2'>{props.fisch.gh.von}-{props.fisch.gh.bis}{props.fisch.gh.einheit}</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>Temperatur:</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography
              variant='body2'>{props.fisch.temperatur.von}-{props.fisch.temperatur.bis}{props.fisch.temperatur.einheit}</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant='body2' sx={{color: 'text.secondary'}}>Schwimmzone:</Typography>
          </Grid>
          <Grid item xs={2} md={2}>
            <Typography variant='body2'>{props.fisch.schwimmzone}</Typography>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>)
    ;
};

export default FischFeedItem;