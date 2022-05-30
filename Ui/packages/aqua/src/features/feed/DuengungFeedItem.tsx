import { Duengung } from 'shared-types';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScienceIcon from '@mui/icons-material/Science';
import { duenger } from "../duengung/duengungStyle";

interface Props {
  duengung: Duengung;
  datum: string;
}

const DuengungFeedItem = ({datum, ...props}: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}>
        <ScienceIcon sx={{color: duenger}}/>
        <Typography sx={{width: '50%', flexGrow: 2, ml: 1}}>Düngung</Typography>
        <Chip label={props.duengung.aquarium.name} variant='outlined'/>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Box sx={{
            display: 'flex'
          }}>
            <Box sx={{
              mr: 1
            }}>
              {props.duengung.menge} ml
            </Box>
            <Box>
              {props.duengung.duenger}
            </Box>
          </Box>
          <Box>
            {datum}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>)
};

export default DuengungFeedItem;