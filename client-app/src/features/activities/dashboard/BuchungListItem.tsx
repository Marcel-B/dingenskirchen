import React from 'react';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Buchung } from '../../../app/models/buchung';

interface Props {
  buchung: Buchung;
}

const BuchungListItem = ({ buchung }: Props) => {
  // const { activityStore } = useStore();
  // const { deleteActivity, loading } = activityStore;
  //
  // const [target, setTarget] = useState("");

  // const handleActivityDelete = (
  //   e: SyntheticEvent<HTMLButtonElement>,
  //   id: string
  // ) => {
  //   setTarget(e.currentTarget.name);
  //   deleteActivity(id).catch((error) => console.log(error));
  // };

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size={`tiny`} circular src={`/assets/user.png`} />
            <Item.Content>
              <Item.Header as={Link} to={`/buchungen/${buchung.id}`}>
                {buchung.name}
              </Item.Header>
              <Item.Description>Hosted by Bop</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name={`clock`} /> {format(buchung.zeitpunkt!, 'dd.MM.yyyy HH:mm')}
          <Icon name={`marker`} /> {buchung.kategorie}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>
          {buchung.beschreibung}
        </span>
        <Button
          as={Link}
          to={`/buchungen/${buchung.id}`}
          color={`teal`}
          floated={`right`}
          content={`Anzeigen`} />
      </Segment>
    </Segment.Group>
  );
};

export default BuchungListItem;
