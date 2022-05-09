"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./index.scss");
var App = function () { return (<div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: tailwindtest</div>
    <div>Framework: react</div>
    <div>Language: TypeScript</div>
    <div>CSS: Tailwind</div>
  </div>); };
react_dom_1.default.render(<App />, document.getElementById("app"));
