// models/Trip.js
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startKilometers: { type: Number, required: true },
  endKilometers: { type: Number, required: true },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
