import React, { SyntheticEvent, useState } from "react";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

interface Props {
  activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
  const { activityStore } = useStore();
  const { deleteActivity, loading } = activityStore;

  const [target, setTarget] = useState("");

  const handleActivityDelete = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id).catch((error) => console.log(error));
  };

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size={`tiny`} circular src={`/assets/user.png`} />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Hosted by Bop</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name={`clock`} /> {activity.date}
          <Icon name={`marker`} /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>
          {activity.description}
        </span>
        <Button
          as={Link}
          to={`/activities/${activity.id}`}
          color={`teal`}
          floated={`right`}
          content={`Anzeigen`}/>
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
