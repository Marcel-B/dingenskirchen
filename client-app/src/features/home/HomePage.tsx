import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function HomePage() {
  return (
    <Container style={{ marginTop: '7em' }}>
      <h1>Willkommen</h1>
      <h3>
        Gehe zum <Link to={`/activities`}>Haushaltsbuch</Link>{' '}
      </h3>
    </Container>
  );
}
