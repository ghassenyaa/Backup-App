const mongoose = require("mongoose");

const backupDistantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    port: { type: String, required: true },
    path: { type: String, required: true },
    SERVICE: { type: String, default: "serveurDistant" },
  },
  { timestamps: true }
);
const DistantServeurForm = mongoose.model(
  "DistantServeurForm",
  backupDistantSchema
);

module.exports = DistantServeurForm;
