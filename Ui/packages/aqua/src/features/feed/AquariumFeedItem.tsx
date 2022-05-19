import {Aquarium} from 'shared-types';
import {Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography} from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Props {
    aquarium: Aquarium;
    datum: string;
}

const AquariumFeedItem = ({datum, ...props}: Props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}>
                <Typography sx={{width: '50%', flexGrow: 2}}>Aquarium</Typography>
                <Chip label={props.aquarium.name} variant='outlined'/>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <Box sx={{mr: 1}}>{props.aquarium.name}</Box>
                        <Box>{props.aquarium.liter} Liter</Box>
                    </Box>
                    <Box>
                        {datum}
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>);
};

export default AquariumFeedItem;