"use strict";
exports.__esModule = true;
exports.ModalStore = void 0;
var mobx_1 = require("mobx");
var ModalStore = /** @class */ (function () {
    function ModalStore() {
        var _this = this;
        this.modal = {
            open: false,
            body: null
        };
        this.openModal = function (content) {
            _this.modal.open = true;
            _this.modal.body = content;
        };
        this.closeModal = function () {
            _this.modal.open = false;
            _this.modal.body = null;
        };
        (0, mobx_1.makeAutoObservable)(this);
    }
    return ModalStore;
}());
exports.ModalStore = ModalStore;
