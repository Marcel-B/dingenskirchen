import {Notiz} from 'shared-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Chip, Grid, Typography} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
    notiz: Notiz;
}

const NotizFeedItem = (props: Props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={{width: '50%', flexGrow: 2}}>Notiz</Typography>
                <Chip label={props.notiz.aquarium.name} variant='outlined'/>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <div>
                        <Chip style={{marginBottom: '1rem'}} label={props.notiz.tag}/>
                        <div>{props.notiz.text}</div>
                    </div>
                    <div>
                        <div>{props.notiz.aquarium.name}</div>
                        <OpenInNewIcon/>
                    </div>
                </Box>
            </AccordionDetails>
        </Accordion>);
};

export default NotizFeedItem;