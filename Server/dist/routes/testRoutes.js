"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// routes/testRoutes.js

var router = _express["default"].Router();
router.get("/connection", function (req, res) {
  // Your logic to test the connection goes here
  try {
    // For demonstration purposes, just sending a success response
    res.status(200).json({
      message: "Connection test successful!"
    });
  } catch (error) {
    console.error("Error testing connection:", error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});
var _default = exports["default"] = router;