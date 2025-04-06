const express = require("express");
const UserProfile = require("../models/UserProfile");
const router = express.Router();

// Get Profile
router.get("/:userId", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    if (!profile) return res.status(401).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
});

// Update or Create Profile
router.post("/", async (req, res) => {
  try {
    const { userId, name, email, dob, gender, image } = req.body;
    let profile = await UserProfile.findOne({ userId });

    if (profile) {
      profile.name = name;
      profile.dob = dob;
      profile.gender = gender;
      profile.image = image;
    } else {
      profile = new UserProfile({ userId, name, email, dob, gender, image });
    }

    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
