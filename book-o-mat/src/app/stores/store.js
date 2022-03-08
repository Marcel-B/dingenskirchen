"use strict";
exports.__esModule = true;
exports.useStore = exports.StoreContext = exports.store = void 0;
var react_1 = require("react");
var commonStore_1 = require("./commonStore");
var userStore_1 = require("./userStore");
var modalStore_1 = require("./modalStore");
var buchungStore_1 = require("./buchungStore");
var tagStore_1 = require("./tagStore");
exports.store = {
    buchungStore: new buchungStore_1["default"](),
    commonStore: new commonStore_1["default"](),
    userStore: new userStore_1["default"](),
    modalStore: new modalStore_1.ModalStore(),
    tagStore: new tagStore_1["default"]()
};
exports.StoreContext = (0, react_1.createContext)(exports.store);
function useStore() {
    return (0, react_1.useContext)(exports.StoreContext);
}
exports.useStore = useStore;
