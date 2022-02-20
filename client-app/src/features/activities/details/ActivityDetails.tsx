import React from "react";
import {Button, Card, Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {LoadingComponent} from "../../../app/layout/LoadingComponent";

export const ActivityDetails = () => {

  const {activityStore} = useStore();
  const {openForm, cancelSelectedActivity, selectedActivity: activity} = activityStore;

  if (!activity) return <LoadingComponent/>;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={`2`}>
          <Button onClick={() => openForm(activity.id)} basic color={`blue`} content={`Bearbeiten`}/>
          <Button basic color={`grey`} content={`Abbrechen`} onClick={() => cancelSelectedActivity()}/>

        </Button.Group>
      </Card.Content>

    </Card>
  )
}
