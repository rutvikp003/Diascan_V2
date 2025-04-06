// fastapi
const mongoose = require("mongoose");

const DetectionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  result: { type: String, required: true },
  bmi: { type: Number, required: true },
  blood_sugar: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Detection", DetectionSchema);
