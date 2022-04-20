import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import NeueMessungForm from './features/messung/NeueMessungForm';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MessungListe from './features/messung/MessungListe';

const App = () => {
  return (
    <Provider store={store}>
      <NeueMessungForm/>
      <MessungListe/>
    </Provider>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));
