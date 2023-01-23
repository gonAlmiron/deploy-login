"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var _default = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL || 'mongodb+srv://gonAlmiron:1234@cluster0.ohn3xaw.mongodb.net/?retryWrites=true&w=majority',
  PUERTO: process.env.PUERTO || 8080
};
exports["default"] = _default;