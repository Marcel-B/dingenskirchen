import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import NeueMessungForm from './features/messung/NeueMessungForm';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NeueMessungForm/>
    </Provider>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));
