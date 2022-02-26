import { Route, Routes } from 'react-router-dom';

import BuchungDashboard from '../../features/activities/dashboard/BuchungDashboard';
import BuchungForm from "../../features/activities/form/BuchungForm";
import { Container } from "semantic-ui-react";
import NavBar from './NavBar';
import TestErrors from "../../features/activities/errors/TestError";

const MainContent = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path='buchungen' element={<BuchungDashboard />} />
          <Route path='buchungen/:id' element={<BuchungForm />} />
          <Route path='createBuchung' element={<BuchungForm />} />
          <Route path='errors' element={<TestErrors />} />
        </Routes>
      </Container>
    </>
  );
};

export default MainContent;