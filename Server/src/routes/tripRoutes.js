// routes/tripRoutes.js
import express from "express";
import {
  createTrip,
  getTrip,
  deleteTripById,
  deleteTrips,
  calculateTotalKilometers,
} from "../controller/tripController.js";

const router = express.Router();

router.post("/create", createTrip);
router.get("/get", getTrip);
router.get("/calculateTotalKilometers", calculateTotalKilometers); // New route
router.delete("/delete/:id", deleteTripById);
router.delete("/deleteAll", deleteTrips);

export default router;
