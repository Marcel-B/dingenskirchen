import React from 'react';
import ReactDOM from 'react-dom';
import { HeaderComponent, NeueMessungComponent } from 'shared-types';
import Header from 'ts-header/Header';
import NeueMessung from 'ts-aqua/NeueMessung';
import { store } from 'ts-app-store/store';

const AppHeader = Header as HeaderComponent;
const AppNeueMessung = NeueMessung as NeueMessungComponent;
import './index.scss';
import { Provider } from 'react-redux';

const App = () =>
  <>
    <Provider store={store}>
      <AppHeader appLinks={[{ name: 'Hey', target: 'You' }, { name: 'Whats', target: 'Up!' }]} />
      <div style={{ width: '100vw', padding: '2rem' }}>
        <AppNeueMessung />
      </div>
    </Provider>
  </>;

ReactDOM.render(<App />, document.getElementById('app'));
