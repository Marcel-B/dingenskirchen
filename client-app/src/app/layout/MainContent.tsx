import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import BuchungDashboard from '../../features/activities/dashboard/BuchungDashboard';

const MainContent = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='buchungen' element={<BuchungDashboard />} />
      </Routes>
    </>

  );
};

export default MainContent;
