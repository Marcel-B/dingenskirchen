import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';

const HomePage = () => {
  const { userStore } = useStore();

  return (
    <Segment inverted textAlign={'center'} vertical className={`masthead`}>
      <Container>
        <Header as={`h1`} inverted>
          <Image size={`massive`} src={`/assets/logo.png`} alt={`logo`} style={{ marginBottom: 12 }} />
          Haushaltsbuch
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as={'h2'} inverted content={'Willkommen im Haushaltsbuch'} />
            <Button as={Link} to={`/activities`} size={`huge`} inverted>
              Zu den Buchungen
            </Button>
          </>
        ) : (
          <Button as={Link} to={`/login`} size={`huge`} inverted>
            Login!
          </Button>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);