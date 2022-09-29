const mongoose = require("mongoose");

const backupDriveSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    googledriveclientid: { type: String, required: true },
    googledriveclientsecret: { type: String, required: true },
    googledrivefolderid: { type: String, required: true },
    refreshToken: { type: String, required: true },
    SERVICE: { type: String, default: "drive" },
  },
  { timestamps: true }
);
const DriveForm = mongoose.model("DriveForm", backupDriveSchema);

module.exports = DriveForm;
