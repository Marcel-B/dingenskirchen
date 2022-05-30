import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './store/store';
import Dashboard from './features/dashboard/Dashboard';
import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import AppHeader from "./layout/AppHeader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./features/admin/Admin";
import AquariumDialog from "./features/aquarium/AquariumDialog";
import NotizDialog from "./features/notiz/NotizDialog";
import DuengungDialog from "./features/duengung/DuengungDialog";
import MessungDialog from "./features/messung/MessungDialog";
import FischDialog from "./features/fisch/FischDialog";
import LoginDialog from "./common/user/LoginDialog";
import StatusType from "./models/statusType";

const back = indigo['A100'];

const App = () => {
  const user = useAppSelector(state => state.user);
  const feed = useAppSelector(state => state.feed);
  const {status} = useAppSelector(state => state.common);

  return (
    <>
      <AppHeader/>
      <AquariumDialog/>
      <NotizDialog/>
      <DuengungDialog/>
      <MessungDialog/>
      <FischDialog/>
      <LoginDialog/>
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={status === StatusType.Loading || feed.status === StatusType.Loading || user.status === StatusType.Loading}>
        <CircularProgress color='inherit'/>
      </Backdrop>
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
    </>
  )
    ;
};

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
  , document.getElementById('app'));
