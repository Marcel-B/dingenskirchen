"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PokemonListView = function (_a) {
    var list = _a.list;
    return (<table>
      {list.map(function (_a) {
            var name = _a.name, type = _a.type;
            return (<tr>
          <td>{name}</td>
          <td>{type}</td>
        </tr>);
        })}
    </table>);
};
// https://www.youtube.com/watch?v=UbEx1v26kCs
exports.default = PokemonListView;
