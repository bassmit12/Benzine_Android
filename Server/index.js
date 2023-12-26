import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import tripRoutes from "./routes/tripRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the trip routes
app.use("/trip", tripRoutes);
app.use("/test", testRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
