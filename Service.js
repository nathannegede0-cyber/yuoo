// server/models/Service.js
const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    serviceType: {
      type: String,
      required: true,
    },
    message: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Service", serviceSchema);
