import { Aquarium, Duengung, Fisch, Messung, Notiz } from 'shared-types';
import { Controller } from './Controller';

const aquariumController = new Controller<Aquarium>('aquarium');
const messungController = new Controller<Messung>('messung');
const fischController = new Controller<Fisch>('fisch');
const duengungController = new Controller<Duengung>('duengung');
const notizController = new Controller<Notiz>('notiz');
export {
  aquariumController,
  messungController,
  fischController,
  duengungController,
  notizController,
};