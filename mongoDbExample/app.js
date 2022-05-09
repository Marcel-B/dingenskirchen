"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var assert = require('assert');
var circulationRepo = require('./repos/circulationRepo');
var data = require('./circulation.json');
var url = "mongodb://root:example@localhost:8081";
var dbName = "circulation";
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, getData, filterData, limitData, id, byId, newItem, addedItem, addedItemQuery, error_1, admin, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    client = new mongodb_1.MongoClient(url);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _c.sent();
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 10, 11, 15]);
                    return [4 /*yield*/, circulationRepo.loadData(data)];
                case 3:
                    results = _c.sent();
                    assert.equal(data.length, results.insertedCount);
                    return [4 /*yield*/, circulationRepo.get()];
                case 4:
                    getData = _c.sent();
                    assert.equal(data.length, getData.length);
                    return [4 /*yield*/, circulationRepo.get({ Newspaper: getData[4].Newspaper })];
                case 5:
                    filterData = _c.sent();
                    assert.deepEqual(filterData[0], getData[4]);
                    return [4 /*yield*/, circulationRepo.get({}, 3)];
                case 6:
                    limitData = _c.sent();
                    assert.equal(limitData.length, 3);
                    id = getData[4]._id.toString();
                    return [4 /*yield*/, circulationRepo.getById(id)];
                case 7:
                    byId = _c.sent();
                    assert.deepEqual(byId, getData[4]);
                    newItem = {
                        "Newspaper": "My paper",
                        "Daily Circulation, 2004": 1,
                        "Daily Circulation, 2013": 2,
                        "Change in Daily Circulation, 2004-2013": 100,
                        "Pulitzer Prize Winners and Finalists, 1990-2003": 0,
                        "Pulitzer Prize Winners and Finalists, 2004-2014": 0,
                        "Pulitzer Prize Winners and Finalists, 1990-2014": 0
                    };
                    return [4 /*yield*/, circulationRepo.add(newItem)];
                case 8:
                    addedItem = _c.sent();
                    return [4 /*yield*/, circulationRepo.getById(addedItem)];
                case 9:
                    addedItemQuery = _c.sent();
                    assert.deepEqual(addedItemQuery, newItem);
                    return [3 /*break*/, 15];
                case 10:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [3 /*break*/, 15];
                case 11:
                    admin = client.db(dbName).admin();
                    //console.log(await admin.serverStatus());
                    return [4 /*yield*/, client.db(dbName).dropDatabase()];
                case 12:
                    //console.log(await admin.serverStatus());
                    _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, admin.listDatabases()];
                case 13:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, client.close()];
                case 14:
                    _c.sent();
                    return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=app.js.map