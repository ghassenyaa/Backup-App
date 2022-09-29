const mongoose = require("mongoose");

const backupAmazonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    AWS_ACCESS_KEY_ID: { type: String, required: true },
    AWS_SECRET_ACCESS_KEY: { type: String, required: true },
    AWS_DEFAULT_REGION: { type: String, required: true },
    AWS_BUCKET: { type: String, required: true },
    AWS_VERSION: { type: String, required: true },
    SERVICE: { type: String, default: "amazon" },
  },
  { timestamps: true }
);
const AmazonForm = mongoose.model("AmazonForm", backupAmazonSchema);

module.exports = AmazonForm;
