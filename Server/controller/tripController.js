// controllers/tripController.js

import Trip from "../db/models/Trip.js";
import { io } from "../index.js"; // Import the io instance from index.js

export const createTrip = async (req, res) => {
  try {
    const { name, startKilometers, endKilometers } = req.body;
    console.log("Received trip data:", req.body);

    const trip = new Trip({ name, startKilometers, endKilometers });
    await trip.save();

    // Emit a 'newTrip' event to all connected clients
    io.emit("newTrip", trip);

    res.status(201).json({ message: "Trip created successfully", trip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getTrip = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTripById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.status(200).json({ message: "Trip deleted successfully", deletedTrip });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTrips = async (req, res) => {
  try {
    await Trip.deleteMany({});
    res.status(200).json({ message: "All trips deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// controllers/tripController.js
export const calculateTotalKilometers = async (req, res) => {
  try {
    const totalKilometers = await Trip.aggregate([
      {
        $group: {
          _id: "$name",
          totalKilometers: {
            $sum: { $subtract: ["$endKilometers", "$startKilometers"] },
          },
        },
      },
    ]);

    res.status(200).json(totalKilometers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
