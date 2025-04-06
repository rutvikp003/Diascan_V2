const express = require("express");
const router = express.Router();
const Detection = require("../models");

// Save detection data
router.post("/save-detection", async (req, res) => {
  try {
    const { user_id, result, bmi, blood_sugar } = req.body;

    const newDetection = new Detection({
      user_id,
      result,
      bmi,
      blood_sugar
    });

    await newDetection.save();
    res.json({ message: "Detection saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error!" });
  }
});

module.exports = router;
