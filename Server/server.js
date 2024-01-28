import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/connectDB.js";
import tripRoutes from "./src/routes/tripRoutes.js";
import testRoutes from "./src/routes/testRoutes.js";
import http from "http"; // Import the 'http' module
import { Server } from "socket.io"; // Import the 'Server' class
import cors from "cors"; // Import the 'cors' middleware

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app); // Create an HTTP server

const io = new Server(server); // Assuming you have httpServer created

app.set("socketio", io); // Set the io instance as part of the app for access in controllers

export { io }; // Create a new instance of the Socket.IO server

const PORT = process.env.PORT || 5000;

app.use(cors()); // Add CORS middleware to allow all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the trip routes
app.use("/trip", tripRoutes);
app.use("/test", testRoutes);

server.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

// Attach Socket.IO to your HTTP server
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle socket events here

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
