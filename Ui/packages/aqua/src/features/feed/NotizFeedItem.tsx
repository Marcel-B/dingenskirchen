import { Notiz } from 'shared-types';
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { notiz } from "../notiz/notizStyle";

interface Props {
  notiz: Notiz;
  datum: string;
}

const NotizFeedItem = ({datum, ...props}: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}>
        <StickyNote2Icon sx={{color: notiz}}/>
        <Typography sx={{width: '50%', flexGrow: 2, ml: 1}}>Notiz</Typography>
        <Chip label={props.notiz.tag}/>
        <Chip sx={{ml: 1}} label={props.notiz.aquarium.name} variant='outlined'/>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Box>{props.notiz.text}</Box>
          <Box>{datum}</Box>
        </Box>
      </AccordionDetails>
    </Accordion>);
};

export default NotizFeedItem;