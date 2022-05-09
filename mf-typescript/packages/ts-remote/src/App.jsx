"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var pokemonList_1 = require("./pokemonList");
require("./index.css");
var PokemonListView_1 = require("./PokemonListView");
var App = function () { return (<div>
    <h1>Hi there, I'm React Remote</h1>
    <PokemonListView_1.default list={(0, pokemonList_1.default)('Bulb')}/>
  </div>); };
react_dom_1.default.render(<App />, document.getElementById('app'));
