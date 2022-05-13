import { Feed, Fisch, Notiz, Aquarium, Duengung, Messung } from 'shared-types';
import NotizFeedItem from './NotizFeedItem';
import DuengungFeedItem from './DuengungFeedItem';
import AquariumFeedItem from './AquariumFeedItem';
import FischFeedItem from './FischFeedItem';
import MessungFeedItem from './MessungFeedItem';

const FeedItem = (props: Feed) => {
  return (
    <>
      {
        props.aquaType === 'notiz' ? (<NotizFeedItem key={props.id} notiz={props.item as Notiz} />) :
          props.aquaType === 'fisch' ? (<FischFeedItem key={props.id} fisch={props.item as Fisch}></FischFeedItem>) :
            props.aquaType === 'aquarium' ? (
                <AquariumFeedItem key={props.id} aquarium={props.item as Aquarium}></AquariumFeedItem>) :
              props.aquaType === 'duengung' ? (
                  <DuengungFeedItem key={props.id} duengung={props.item as Duengung}></DuengungFeedItem>) :
                props.aquaType === 'messung' ? (
                    <MessungFeedItem key={props.id} messung={props.item as Messung}></MessungFeedItem>) :
                  <p>Unbekannter Eingrag</p>
      }
    </>
  );
};

export default FeedItem;