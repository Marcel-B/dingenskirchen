"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
require("./tsremote-mf-decl.d");
var PokemonListView_1 = require("tsremote-mf/PokemonListView");
var pokemonList_1 = require("tsremote-mf/pokemonList");
require("./index.css");
var getPokemonList = pokemonList_1.default;
var PokemonComp = PokemonListView_1.default;
var App = function () { return (<div>
  <h1>TS-HOST</h1>
  <PokemonComp list={getPokemonList('Bulb')}/>
</div>); };
react_dom_1.default.render(<App />, document.getElementById('app'));
