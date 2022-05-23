import { Messung } from 'shared-types';
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Chip, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import { teal } from "@mui/material/colors";
import { messung } from "../messung/messungStyle";

interface Props {
  messung: Messung;
  datum: string;
}

const MessungFeedItem = ({datum, ...props}: Props) => {
  const getFormattedValue = (value: number, wert: string) => {
    switch (wert) {
      case "PO₄":
      case "NH₄":
      case "NO₂":
      case "NO₃":
        return new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        }).format(value) + ` mg/l`;
      case "GH":
      case "KH":
        return new Intl.NumberFormat('de-DE'
        ).format(value) + '°dH';
      default:
        return new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2
        }).format(value);
    }
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}>
        <DeviceThermostatIcon sx={{color: messung}}/>
        <Typography sx={{width: '50%', flexGrow: 2, ml: 1}}>Messung</Typography>
        <Chip label={props.messung.aquarium.name} variant='outlined'/>
      </AccordionSummary>
      <AccordionDetails>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Box sx={{
            display: 'flex',
          }}>
            <Box sx={{
              mr: 1
            }}>{props.messung.wert}</Box>
            <Box>{getFormattedValue(props.messung.menge, props.messung.wert)}</Box>
          </Box>
          <Box>{datum}</Box>
        </Box>
      </AccordionDetails>
    </Accordion>);
};

export default MessungFeedItem;