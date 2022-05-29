import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './features/dashboard/Dashboard';
import { Box, Container, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import AppHeader from "./layout/AppHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FischListe from "./features/fisch/FischListe";
import Admin from "./features/admin/Admin";
import AquariumDialog from "./features/aquarium/AquariumDialog";
import NotizDialog from "./features/notiz/NotizDialog";
import DuengungDialog from "./features/duengung/DuengungDialog";
import MessungDialog from "./features/messung/MessungDialog";
import FischDialog from "./features/fisch/FischDialog";
import LoginDialog from "./common/user/LoginDialog";

const back = indigo['A100'];

const App = () => {

  return (
    <Provider store={store}>
      <AppHeader/>
      <AquariumDialog/>
      <NotizDialog/>
      <DuengungDialog/>
      <MessungDialog/>
      <FischDialog/>
      <LoginDialog/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path="admin" element={<Admin/>}/>
        <Route
          path="*"
          element={
            <Box sx={{p: 6, display: 'flex', justifyContent: 'space-around'}}>
              <Typography variant='h1'>Kein Fisch weit und breit</Typography>
            </Box>
          }
        />
      </Routes>
    </Provider>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
  , document.getElementById('app'));
