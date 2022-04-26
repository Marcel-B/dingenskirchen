import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './features/dashboard/Dashboard';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <Container style={{paddingTop: '2rem'}}>
        <Dashboard />
      </Container>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
