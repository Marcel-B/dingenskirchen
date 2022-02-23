import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Header, Image, Segment} from 'semantic-ui-react';

export default function HomePage() {
  return (
      <Segment inverted textAlign={"center"} vertical className={`masthead`}>
          <Container>
              <Header as={`h1`} inverted>
                  <Image size={`massive`} src={`/assets/logo.png`} alt={`logo`} style={{marginBottom: 12}}/>
                  Haushaltsbuch
              </Header>
             <Header as={`h2`} inverted content={`Willkommen zum Haushalsbuch`}/>
              <Button as={Link} to={`/activities`} size={`huge`} inverted>
                  Zu den Buchungen
              </Button>
          </Container>
      </Segment>
  );
}
