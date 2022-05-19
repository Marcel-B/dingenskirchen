import {FeedItem, Fisch, Notiz, Aquarium, Duengung, Messung} from 'shared-types';
import NotizFeedItem from './NotizFeedItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DuengungFeedItem from './DuengungFeedItem';
import AquariumFeedItem from './AquariumFeedItem';
import FischFeedItem from './FischFeedItem';
import MessungFeedItem from './MessungFeedItem';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";

const FeedItem = (props: FeedItem) => {
    return (
        <>
            {
                props.aquaType === 'notiz' ? (
                        <NotizFeedItem
                            key={props.id}
                            notiz={props.item as Notiz}/>
                    ) :
                    props.aquaType === 'fisch' ? (
                            <FischFeedItem
                                key={props.id}
                                fisch={props.item as Fisch}/>
                        ) :
                        props.aquaType === 'aquarium' ? (
                                <AquariumFeedItem
                                    key={props.id}
                                    aquarium={props.item as Aquarium}/>
                            ) :
                            props.aquaType === 'duengung' ? (
                                    <DuengungFeedItem
                                        key={props.id}
                                        duengung={props.item as Duengung}/>
                                ) :
                                props.aquaType === 'messung' ? (
                                    <MessungFeedItem
                                        key={props.id}
                                        messung={props.item as Messung}/>
                                ) : (

                                    <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}>
                                            Unbekannter Eingrag
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <p>Unbekannter Eingrag</p>
                                        </AccordionDetails>
                                    </Accordion>)
            }
        </>
    );
};

export default FeedItem;