"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initDb = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = _interopRequireDefault(require("../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var initDb = function initDb() {
  _mongoose["default"].set('strictQuery', true);
  return _mongoose["default"].connect(_config["default"].MONGO_ATLAS_URL);
};
exports.initDb = initDb;