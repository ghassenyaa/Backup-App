const mongoose = require("mongoose");

// Creating a Schema for uploaded files
const fileDriveSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  counter: {
    type: Number,
  },
});

const FileDrive = mongoose.model("FileDrive", fileDriveSchema);
module.exports = FileDrive;
