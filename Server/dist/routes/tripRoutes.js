"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _tripController = require("../controller/tripController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// routes/tripRoutes.js

var router = _express["default"].Router();
router.post("/create", _tripController.createTrip);
router.get("/get", _tripController.getTrip);
router.get("/calculateTotalKilometers", _tripController.calculateTotalKilometers); // New route
router["delete"]("/delete/:id", _tripController.deleteTripById);
router["delete"]("/deleteAll", _tripController.deleteTrips);
var _default = exports["default"] = router;