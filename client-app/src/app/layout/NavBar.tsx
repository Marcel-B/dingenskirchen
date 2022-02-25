import React from 'react';
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const NavBar = () => {
  const { userStore: { user, logout } } = useStore();

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
        <Menu.Item as={NavLink} to={`/errors`} name='Fehler' />
        <Menu.Item>
          <Button
            as={NavLink}
            to={`/createActivity`}
            positive
            content='Buchung anlegen'
          />
        </Menu.Item>
        <Menu.Item position={'right'}>
          <Image src={user?.image || '/assets/user.png'} avatar spaced={'right'} />
          <Dropdown pointing={'top left'} text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text={'Mein Profil'} icon={'user'} />
              <Dropdown.Item onClick={logout} as={Link} text={'Ausloggen'} icon={'power'} />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);