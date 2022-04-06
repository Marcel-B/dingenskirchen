import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import Login from "./features/login/Login";

const App = () => (
  <Login/>
);
ReactDOM.render(<App />, document.getElementById("app"));
