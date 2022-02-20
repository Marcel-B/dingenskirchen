import React, {Fragment, useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import {NavBar} from "./NavBar";
import agent from "../api/agent";
import {LoadingComponent} from "./LoadingComponent";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const {activityStore} = useStore();


  const [activities, setActivities] = useState<Activity[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  useEffect(() => {
    activityStore.loadActivities().catch(error => console.log(error))
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content={`Bitte warten...`}/>
  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
          activities={activityStore.activities}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}/>
      </Container>
    </Fragment>
  );
}

export default observer(App);
