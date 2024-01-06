"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = void 0;
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _connectDB = _interopRequireDefault(require("./db/connectDB.js"));
var _tripRoutes = _interopRequireDefault(require("./routes/tripRoutes.js"));
var _testRoutes = _interopRequireDefault(require("./routes/testRoutes.js"));
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Import the 'http' module
// Import the 'Server' class

_dotenv["default"].config();
(0, _connectDB["default"])();
var app = (0, _express["default"])();
var server = _http["default"].createServer(app); // Create an HTTP server

var io = exports.io = new _socket.Server(server); // Assuming you have httpServer created

app.set("socketio", io); // Set the io instance as part of the app for access in controllers

// Create a new instance of the Socket.IO server

var PORT = process.env.PORT || 5000;
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));

// Use the trip routes
app.use("/trip", _tripRoutes["default"]);
app.use("/test", _testRoutes["default"]);
server.listen(PORT, function () {
  console.log("Server started at http://localhost:".concat(PORT));
});

// Attach Socket.IO to your HTTP server
io.on("connection", function (socket) {
  console.log("A user connected");

  // Handle socket events here

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });
});