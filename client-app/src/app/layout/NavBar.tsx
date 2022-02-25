import { Button, Container, Image, Menu } from 'semantic-ui-react';

import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';

const NavBar = () => {
  const { userStore: { user} } = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to={`/`} exact header>
          <img
            src='/assets/offenes-buch.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Haushaltsbuch
        </Menu.Item>
        <Menu.Item as={NavLink} to={`/app/buchungen`} name='Buchungen' />
        <Menu.Item as={NavLink} to={`/app/errors`} name='Fehler' />
        <Menu.Item>
          <Button
            as={NavLink}
            to={`/app/createBuchung`}
            positive
            content='Buchung anlegen'
          />
        </Menu.Item>
        <Menu.Item position={'right'}>
          <Image src={user?.image || '/assets/user.png'} avatar spaced={'right'} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(NavBar);