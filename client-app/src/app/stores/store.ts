import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import UserStore from './userStore';
import { ModalStore } from '../models/modalStore';
import BuchungStore from './buchungStore';

interface Store {
  buchungStore: BuchungStore;
  commonStore: CommonStore;
  userStore: UserStore;
  modalStore: ModalStore;
}

export const store: Store = {
  buchungStore: new BuchungStore(),
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
