import { makeAutoObservable, reaction } from 'mobx';
var CommonStore = /** @class */ (function () {
    function CommonStore() {
        var _this = this;
        this.error = null;
        this.token = window.localStorage.getItem('jwt');
        this.appLoaded = false;
        this.setServerError = function (error) {
            _this.error = error;
        };
        this.setToken = function (token) {
            _this.token = token;
        };
        this.setAppLoaded = function () {
            _this.appLoaded = true;
        };
        makeAutoObservable(this);
        // wird ausgeführt, wenn sich token ändert
        reaction(function () { return _this.token; }, function (token) {
            if (token) {
                window.localStorage.setItem('jwt', token);
            }
            else {
                window.localStorage.removeItem('jwt');
            }
        });
    }
    return CommonStore;
}());
export default CommonStore;
