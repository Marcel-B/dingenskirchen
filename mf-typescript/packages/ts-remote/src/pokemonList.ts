import {Pokemon, PokemonListFunction} from './types';

const pokemon: Pokemon[] = [
  {
    name: "Bulbasaur",
    type: "Fire"
  },
  {
    name: "Bulbafour",
    type: "Earth"
  }
]

const getList: PokemonListFunction = (nameFilter: string) => pokemon.filter(({name}) => name.includes(nameFilter))

export default getList;