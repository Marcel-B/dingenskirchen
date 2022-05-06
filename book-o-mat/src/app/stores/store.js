import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import UserStore from './userStore';
import { ModalStore } from './modalStore';
import BuchungStore from './buchungStore';
import TagStore from './tagStore';
export var store = {
    buchungStore: new BuchungStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    tagStore: new TagStore(),
};
export var StoreContext = createContext(store);
export function useStore() {
    return useContext(StoreContext);
}
