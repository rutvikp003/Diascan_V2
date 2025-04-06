//this is user model
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  authType: { type: String, enum: ["email", "google"], required: true },
},
{timestamps: true, }); // ✅ This adds `createdAt` and `updatedAt` automatically

module.exports = mongoose.model("User", UserSchema);
