import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

const NavBar = () => {
  const navigate = useNavigate();
  const {
    userStore: { user, logout },
  } = useStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to={`/`} exact header>
          <img
            src='/assets/offenes-buch.png'
            alt='logo'
            style={{ marginRight: 10 }}
          />
          Haushaltsbuch
        </Menu.Item>
        <Menu.Item as={NavLink} to={`/app/buchungen`} name='Buchungen' />
        <Menu.Item>
          <Button
            as={NavLink}
            to={`/app/createBuchung`}
            positive
            content='Buchung anlegen'
          />
        </Menu.Item>
        <Menu.Item position={'right'}>
          <Image
            src={user?.image || '/assets/user.png'}
            avatar
            spaced='right'
          />
          <Dropdown pointing='top left' text={user?.displayName}>
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to={`/profile/${user?.username}`}
                text='Profil'
                icon='user'
              />
              <Dropdown.Item
                onClick={handleLogout}
                text='Logout'
                icon='power'
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
