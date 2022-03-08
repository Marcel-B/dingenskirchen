"use strict";
exports.__esModule = true;
var mobx_1 = require("mobx");
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
        (0, mobx_1.makeAutoObservable)(this);
        // wird ausgeführt, wenn sich token ändert
        (0, mobx_1.reaction)(function () { return _this.token; }, function (token) {
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
exports["default"] = CommonStore;
