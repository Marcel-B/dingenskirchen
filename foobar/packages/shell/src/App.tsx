import React from 'react';
import ReactDOM from 'react-dom';
import { HeaderComponent, NeueMessungComponent } from 'shared-types';
import Header from 'ts-header/Header';
import NeueMessung from 'ts-aqua/NeueMessung';

const AppHeader = Header as HeaderComponent;
const AppNeueMessung = NeueMessung as NeueMessungComponent;
import './index.scss';

const App = () =>
  <>
    <AppHeader appLinks={[{ name: 'Hey', target: 'You' }, { name: 'Whats', target: 'Up!' }]} />
    <AppNeueMessung />
  </>;

ReactDOM.render(<App />, document.getElementById('app'));
