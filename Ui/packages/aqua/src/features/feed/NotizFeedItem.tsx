import {Notiz} from 'shared-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Chip, Grid, Typography} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
    notiz: Notiz;
    datum: string;
}

const NotizFeedItem = ({datum, ...props}: Props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={{width: '50%', flexGrow: 2}}>Notiz</Typography>
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