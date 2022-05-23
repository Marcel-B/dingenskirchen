import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './features/dashboard/Dashboard';
import { Box, Container } from '@mui/material';
import { indigo } from '@mui/material/colors';

const back = indigo['A100'];

const App = () => {

  return (
    <Provider store={store}>
      <Box sx={{
        m: 0,
        p: 0
      }}>
        <Container sx={{
          pt: 1,
        }}>
          <Dashboard/>
        </Container>
      </Box>
    </Provider>);
};

ReactDOM.render(<App/>, document.getElementById('app'));
