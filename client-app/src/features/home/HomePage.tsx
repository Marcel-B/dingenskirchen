import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { Link, Outlet } from 'react-router-dom';

import LoginForm from '../users/LoginForm';
import React from 'react';
import RegisterForm from '../users/RegisterForm';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../app/stores/store';

const HomePage = () => {
  const { userStore, modalStore } = useStore();

  return (
      <>
    <Segment inverted textAlign={'center'} vertical className={`masthead`}>
      <Container>
        <Header as={`h1`} inverted>
          <Image
            size={`massive`}
            src={`/assets/offenes-buch.png`}
            alt={`logo`}
            style={{ marginBottom: 12 }}
          />
          Haushaltsbuch
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content={'Willkommen im Haushaltsbuch'} />
            <Button as={Link} to={`/app/buchungen`} size={`huge`} inverted>
              Zu den Buchungen
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              size={`huge`}
              inverted>
              Einloggen!
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegisterForm />)}
              size={`huge`}
              inverted>
              Registrieren!
            </Button>
          </>
        )}
      </Container>
    </Segment>
    <Outlet/>
    </>
  );
};

export default observer(HomePage);
