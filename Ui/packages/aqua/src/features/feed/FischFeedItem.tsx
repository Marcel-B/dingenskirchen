import {Fisch} from 'shared-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Chip, Grid, Typography} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface Props {
    fisch: Fisch;
}

const FischFeedItem = ({...props}: Props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={{width: '50%', flexGrow: 2}}>Fisch</Typography>
                <Chip label={props.fisch.aquarium.name} variant='outlined'/>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div>{props.fisch.name}</div>
                        <div>{props.fisch.wissenschaftlich}</div>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>);
};

export default FischFeedItem;