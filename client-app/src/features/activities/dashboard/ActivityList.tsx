import {Activity} from "../../../app/models/activity";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import {useStore} from "../../../app/stores/store";

interface Props {
  activities: Activity[];
  submitting: boolean;
  deleteActivity: (id: string) => void;
}

export const ActivityList = ({activities, deleteActivity, submitting}: Props) => {
  const {activityStore} = useStore();
  const {selectActivity} = activityStore;

  const [target, setTarget] = useState('');

  const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activities.map(activity => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as='a'>{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>
                  {activity.description}
                </div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectActivity(activity.id)} floated='right' content='Anzeigen' color='blue'/>
                <Button loading={submitting && target === activity.id}
                        name={activity.id}
                        onClick={(e) => handleActivityDelete(e, activity.id)} floated='right' content='Löschen'
                        color='red'/>
                <Label basic content={activity.category}/>
              </Item.Extra>

            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
