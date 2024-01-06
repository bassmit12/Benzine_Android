"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// models/Trip.js

var tripSchema = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  startKilometers: {
    type: Number,
    required: true
  },
  endKilometers: {
    type: Number,
    required: true
  }
});
var Trip = _mongoose["default"].model("Trip", tripSchema);
var _default = exports["default"] = Trip;