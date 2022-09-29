const mongoose = require("mongoose");

const backupAzureSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    AZURE_STORAGE_CONNECTION_STRING: { type: String, required: true },
    AZURE_BLOB_LINK: { type: String, required: true },
    SERVICE: { type: String, default: "azure" },
  },
  { timestamps: true }
);
const AzureForm = mongoose.model("AzureForm", backupAzureSchema);

module.exports = AzureForm;
