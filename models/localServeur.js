const mongoose = require("mongoose");

const backupLocalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ip: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    port: { type: String, required: true },
    path: { type: String, required: true },
    SERVICE: { type: String, default: "localServer" },
  },
  { timestamps: true }
);
const LocalServeurForm = mongoose.model("LocalServeurForm", backupLocalSchema);

module.exports = LocalServeurForm;
