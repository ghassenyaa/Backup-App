const mongoose = require("mongoose");

const backupDropBoxSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    DROPBOX_ACCESS_TOKEN: { type: String, required: true },
    DROPBOX_PATH: { type: String, required: true },
    SERVICE: { type: String, default: "dropbox" },
  },
  { timestamps: true }
);
const DropBoxForm = mongoose.model("DropBoxForm", backupDropBoxSchema);

module.exports = DropBoxForm;
