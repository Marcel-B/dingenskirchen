import { makeAutoObservable } from 'mobx';
var ModalStore = /** @class */ (function () {
    function ModalStore() {
        var _this = this;
        this.modal = {
            open: false,
            body: null,
        };
        this.openModal = function (content) {
            _this.modal.open = true;
            _this.modal.body = content;
        };
        this.closeModal = function () {
            _this.modal.open = false;
            _this.modal.body = null;
        };
        makeAutoObservable(this);
    }
    return ModalStore;
}());
export { ModalStore };
