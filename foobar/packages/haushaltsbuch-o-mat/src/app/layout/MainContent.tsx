import { Route, Routes } from 'react-router-dom';

import BuchungDashboard from '../../features/buchungen/dashboard/BuchungDashboard';
import BuchungForm from "../../features/buchungen/form/BuchungForm";
import NavBar from './NavBar';
import TestErrors from "../../features/buchungen/errors/TestError";
import TagForm from "../../features/tags/TagForm";
import { Box } from '@mui/material';

const MainContent = () => {
  return (
    <>
      <NavBar />
      <Box>
        <Routes>
          <Route path='buchungen' element={<BuchungDashboard />} />
          <Route path='buchungen/:id' element={<BuchungForm />} />
          <Route path='createBuchung' element={<BuchungForm />} />
          <Route path='createTag' element={<TagForm />} />
          <Route path='errors' element={<TestErrors />} />
        </Routes>
      </Box>
    </>
  );
};

export default MainContent;
