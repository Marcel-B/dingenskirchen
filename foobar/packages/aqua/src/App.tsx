import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import NeueMessungForm from './features/messung/NeueMessungForm';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MessungListe from './features/messung/MessungListe';
import { Divider, Stack } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <Stack direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={4}>
        <MessungListe />
        <NeueMessungForm />
      </Stack>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
