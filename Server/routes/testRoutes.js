// routes/testRoutes.js
import express from "express";

const router = express.Router();

router.get("/connection", (req, res) => {
  // Your logic to test the connection goes here
  try {
    // For demonstration purposes, just sending a success response
    res.status(200).json({ message: "Connection test successful!" });
  } catch (error) {
    console.error("Error testing connection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
