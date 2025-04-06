const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../config/jwt");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists..." });
    }

    //hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      authType: "email"
    });

    await user.save();

    const token = generateToken(user._id);

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
     
    //verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT token
    const token = generateToken(user._id);

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });

    
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// Protected User Profile Route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;