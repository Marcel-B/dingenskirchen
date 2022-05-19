import React from 'react';
import ReactDOM from 'react-dom';
import { HeaderComponent } from 'shared-types';
import Header from 'ts-header/Header';

const AppHeader = Header as HeaderComponent;

import './index.scss';

const App = () =>
  <>
    <AppHeader appLinks={[{ name: 'Hey', target: 'You' }, { name: 'Whats', target: 'Up!' }]} />
    <div style={{ width: '100vw', padding: '2rem' }}>
    </div>
  </>;

ReactDOM.render(<App />, document.getElementById('app'));
