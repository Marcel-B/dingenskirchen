import React, {Fragment, useEffect} from 'react';
import {Container} from "semantic-ui-react";
import {NavBar} from "./NavBar";
import {LoadingComponent} from "./LoadingComponent";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

const App = () => {
  const {activityStore} = useStore();

  useEffect(() => {
    activityStore.loadActivities().catch(error => console.log(error))
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content={`Bitte warten...`}/>
  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard/>
      </Container>
    </Fragment>
  );
}

export default observer(App);
