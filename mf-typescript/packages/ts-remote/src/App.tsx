import React from 'react';
import ReactDOM from 'react-dom';
import getList from './pokemonList';
import './index.css';
import PokemonListView from './PokemonListView';


const App = () => (
  <div>
    <h1>Hi there, I'm React Remote</h1>
    <PokemonListView list={getList('Bulb')} />
  </div>);

ReactDOM.render(<App />, document.getElementById('app'));
