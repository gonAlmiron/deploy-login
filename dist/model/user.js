"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserModel = void 0;
var _mongoose = require("mongoose");
var UserSchema = new _mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
var UserModel = (0, _mongoose.model)('user', UserSchema);
exports.UserModel = UserModel;