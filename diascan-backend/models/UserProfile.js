const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: Date },
  gender: { type: String },
  image: { type: String }, // Store image URL or base64 string
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
