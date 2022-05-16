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
function circulationRepo() {
    var url = "mongodb://root:example@localhost:8081";
    var dbName = "circulation";
    function get(query, limit) {
        if (query === void 0) { query = {}; }
        if (limit === void 0) { limit = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var client, db, items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new mongodb_1.MongoClient(url);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        db = client.db(dbName);
                        items = db.collection('newspapers').find(query);
                        if (limit > 0) {
                            items = items.limit(limit);
                        }
                        return [4 /*yield*/, items.toArray()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5: return [4 /*yield*/, client.close()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function getById(id) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, item, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new mongodb_1.MongoClient(url);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        db = client.db(dbName);
                        return [4 /*yield*/, db.collection('newspapers')
                                .findOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 3:
                        item = _a.sent();
                        return [2 /*return*/, item];
                    case 4:
                        error_2 = _a.sent();
                        throw error_2;
                    case 5: return [4 /*yield*/, client.close()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function add(item) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, addedItem, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new mongodb_1.MongoClient(url);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        db = client.db(dbName);
                        return [4 /*yield*/, db.collection('newspapers').insertOne(item)];
                    case 3:
                        addedItem = _a.sent();
                        console.log(addedItem.insertedId);
                        return [2 /*return*/, addedItem.insertedId];
                    case 4:
                        error_3 = _a.sent();
                        throw error_3;
                    case 5: return [4 /*yield*/, client.close()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    function loadData(data) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new mongodb_1.MongoClient(url);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 7]);
                        return [4 /*yield*/, client.connect()];
                    case 2:
                        _a.sent();
                        db = client.db(dbName);
                        return [4 /*yield*/, db.collection("newspapers").insertMany(data)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_4 = _a.sent();
                        throw error_4;
                    case 5: return [4 /*yield*/, client.close()];
                    case 6:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }
    return { loadData: loadData, get: get, getById: getById, add: add };
}
module.exports = circulationRepo();
//# sourceMappingURL=circulationRepo.js.map