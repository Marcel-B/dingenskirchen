"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var mobx_1 = require("mobx");
var buchung_1 = require("../models/buchung");
var agent_1 = require("../api/agent");
var date_fns_1 = require("date-fns");
var BuchungStore = /** @class */ (function () {
    function BuchungStore() {
        var _this = this;
        this.buchungRegistry = new Map();
        this.selectedBuchung = undefined;
        this.editMode = false;
        this.loading = false;
        this.loadingInitial = false;
        this.addTag = function (buchung, tag) {
            (0, mobx_1.runInAction)(function () {
                buchung.tags = __spreadArray(__spreadArray([], buchung.tags, true), [tag], false);
            });
        };
        this.removeTag = function (buchung, tag) {
            (0, mobx_1.runInAction)(function () {
                buchung.tags = __spreadArray([], buchung.tags.filter(function (t) { return t.id !== tag.id; }), true);
            });
        };
        this.loadBuchungen = function () { return __awaiter(_this, void 0, void 0, function () {
            var buchungen, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loadingInitial = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Buchungen.list()];
                    case 2:
                        buchungen = _a.sent();
                        buchungen.forEach(function (buchung) {
                            _this.setBuchung(buchung);
                        });
                        this.setLoadingInitial(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        this.setLoadingInitial(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.loadBuchung = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var buchung, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        buchung = this.getBuchung(id);
                        if (!buchung) return [3 /*break*/, 1];
                        this.selectedBuchung = buchung;
                        return [2 /*return*/, buchung];
                    case 1:
                        this.loadingInitial = true;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, agent_1["default"].Buchungen.details(id)];
                    case 3:
                        buchung = _a.sent();
                        this.setBuchung(buchung);
                        (0, mobx_1.runInAction)(function () {
                            _this.selectedBuchung = buchung;
                        });
                        this.setLoadingInitial(false);
                        return [2 /*return*/, buchung];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        this.setLoadingInitial(false);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.getBuchung = function (id) {
            return _this.buchungRegistry.get(id);
        };
        this.setBuchung = function (buchung) {
            buchung.zeitpunkt = new Date(buchung.zeitpunkt);
            _this.buchungRegistry.set(buchung.id, buchung);
        };
        this.setLoadingInitial = function (state) {
            _this.loadingInitial = state;
        };
        this.createBuchung = function (buchung) { return __awaiter(_this, void 0, void 0, function () {
            var newBuchung_1, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Buchungen.create(buchung)];
                    case 2:
                        _a.sent();
                        newBuchung_1 = new buchung_1.Buchung(buchung);
                        this.setBuchung(newBuchung_1);
                        (0, mobx_1.runInAction)(function () {
                            // this.buchungen.push(buchung);
                            _this.selectedBuchung = newBuchung_1;
                            _this.editMode = false;
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        (0, mobx_1.runInAction)(function () {
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.updateBuchung = function (buchung) { return __awaiter(_this, void 0, void 0, function () {
            var error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Buchungen.update(buchung)];
                    case 2:
                        _a.sent();
                        (0, mobx_1.runInAction)(function () {
                            if (buchung.id) {
                                var updatedBuchung = __assign(__assign({}, _this.getBuchung(buchung.id)), buchung);
                                _this.buchungRegistry.set(buchung.id, updatedBuchung);
                                _this.selectedBuchung = updatedBuchung;
                            }
                            _this.editMode = false;
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        (0, mobx_1.runInAction)(function () {
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteBuchung = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var error_5;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.loading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, agent_1["default"].Buchungen["delete"](id)];
                    case 2:
                        _a.sent();
                        (0, mobx_1.runInAction)(function () {
                            // this.buchungen = [...this.buchungen.filter(a => a.id !== id)];
                            _this.buchungRegistry["delete"](id);
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _a.sent();
                        console.log(error_5);
                        (0, mobx_1.runInAction)(function () {
                            _this.loading = false;
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        (0, mobx_1.makeAutoObservable)(this);
    }
    Object.defineProperty(BuchungStore.prototype, "buchungenByDate", {
        get: function () {
            return Array.from(this.buchungRegistry.values()).sort(function (a, b) { return a.zeitpunkt.getTime() - b.zeitpunkt.getTime(); });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "getTags", {
        get: function () {
            var _a;
            return (_a = this.selectedBuchung) === null || _a === void 0 ? void 0 : _a.tags;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "groupedBuchungen", {
        get: function () {
            return Object.entries(this.buchungenByDate.reduce(function (buchungen, buchung) {
                var zeitpunkt = (0, date_fns_1.format)(buchung.zeitpunkt, 'dd.MM.yyyy');
                buchungen[zeitpunkt] = buchungen[zeitpunkt]
                    ? __spreadArray(__spreadArray([], buchungen[zeitpunkt], true), [buchung], false) : [buchung];
                return buchungen;
            }, {}));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "einnahmenGesamt", {
        get: function () {
            return Array.from(this.buchungRegistry.values())
                .filter(function (buchung) { return buchung.kategorie === 1; })
                .map(function (buchung) { return buchung.betrag; })
                .reduce(function (prev, curr) {
                if (prev && curr)
                    return prev + curr;
                if (!prev)
                    return curr;
                return prev;
            }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "ausgabenGesamt", {
        get: function () {
            return Array.from(this.buchungRegistry.values())
                .filter(function (buchung) { return buchung.kategorie === 2; })
                .map(function (buchung) { return buchung.betrag; })
                .reduce(function (prev, curr) {
                if (prev && curr)
                    return prev + curr;
                if (!prev)
                    return curr;
                return prev;
            }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "ausgabenNurMonatlich", {
        get: function () {
            return Array.from(this.buchungRegistry.values())
                .filter(function (buchung) { return buchung.kategorie === 2 && buchung.intervall < 3; })
                .map(function (buchung) { return buchung.betrag; })
                .reduce(function (prev, curr) {
                if (prev && curr)
                    return prev + curr;
                if (!prev)
                    return curr;
                return prev;
            }, 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "restMonatlich", {
        get: function () {
            return this.einnahmenGesamt - this.ausgabenNurMonatlich;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BuchungStore.prototype, "restMonatlichVerrechnet", {
        get: function () {
            return this.einnahmenGesamt - this.ausgabenGesamt;
        },
        enumerable: false,
        configurable: true
    });
    return BuchungStore;
}());
exports["default"] = BuchungStore;
