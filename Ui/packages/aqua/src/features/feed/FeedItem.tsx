import { Fisch, Notiz, Aquarium, Duengung, Messung } from 'shared-types';
import NotizFeedItem from './NotizFeedItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DuengungFeedItem from './DuengungFeedItem';
import AquariumFeedItem from './AquariumFeedItem';
import FischFeedItem from './FischFeedItem';
import MessungFeedItem from './MessungFeedItem';
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from 'react';

interface Props {
  id: string;
  item: Aquarium | Notiz | Messung | Duengung | Fisch;
  aquaType: string;
  datum: string;
}

const FeedItem = ({id, item, aquaType, datum}: Props) => {
  return (
    <>
      {
        aquaType === 'notiz' ? (
            <NotizFeedItem
              key={id}
              datum={datum}
              notiz={item as Notiz}/>
          ) :
          aquaType === 'fisch' ? (
              <FischFeedItem
                key={id}
                datum={datum}
                fisch={item as Fisch}/>
            ) :
            aquaType === 'aquarium' ? (
                <AquariumFeedItem
                  key={id}
                  datum={datum}
                  aquarium={item as Aquarium}/>
              ) :
              aquaType === 'duengung' ? (
                  <DuengungFeedItem
                    key={id}
                    datum={datum}
                    duengung={item as Duengung}/>
                ) :
                aquaType === 'messung' ? (
                  <MessungFeedItem
                    key={id}
                    datum={datum}
                    messung={item as Messung}/>
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