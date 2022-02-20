import React from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {useStore} from "../stores/store";

export const NavBar = () => {

  const {activityStore} = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.png" alt='logo' style={{marginRight: '10px'}}/>
          Haushaltsbuch
        </Menu.Item>
        <Menu.Item name='Einträge'/>
        <Menu.Item>
          <Button onClick={() => activityStore.openForm()}  positive content='neuer Eintrag'/>
        </Menu.Item>
      </Container>
    </Menu>
  )
}
