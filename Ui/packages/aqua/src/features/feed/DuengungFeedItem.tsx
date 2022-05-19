import {Duengung} from 'shared-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
    duengung: Duengung;
}

const DuengungFeedItem = ({...props}: Props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={{width: '50%', flexGrow: 2}}>Düngung</Typography>
                <Chip label={props.duengung.aquarium.name} variant='outlined'/>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
        </Accordion>)
};

export default DuengungFeedItem;