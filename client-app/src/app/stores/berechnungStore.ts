import { makeAutoObservable } from 'mobx';

export default class BerechnungStore {
  constructor() {
    makeAutoObservable(this);
  }
}
