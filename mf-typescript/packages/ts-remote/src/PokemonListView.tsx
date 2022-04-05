import { Pokemon } from 'shared-types';
import React from 'react';

const PokemonListView = ({ list }: { list: Pokemon[] }) => {
  return (
    <table>
      {list.map(({ name, type }) => (
        <tr>
          <td>{name}</td>
          <td>{type}</td>
        </tr>
      ))}
    </table>
  );
};
// https://www.youtube.com/watch?v=UbEx1v26kCs
export default PokemonListView;