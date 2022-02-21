import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to={`/`} exact header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Haushaltsbuch
        </Menu.Item>
        <Menu.Item as={NavLink} to={`/activities`} name='Buchungen' />
        <Menu.Item>
          <Button
            as={NavLink}
            to={`/createActivity`}
            positive
            content='Buchung anlegen'
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};
