const AmazonForm = require("../models/amazon");
const DropBoxForm = require("../models/dropBox");
const AzureForm = require("../models/azure");
const DriveForm = require("../models/drive");
const LocalForm = require("../models/localServeur");
const DistantForm = require("../models/distantServeur");
const FileDrive = require("../models/driveFiles");
const bcrypt = require("bcrypt");

const postAmazonForm = async (req, res) => {
  const {
    name,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION,
    AWS_BUCKET,
    AWS_VERSION,
  } = req.body;
  if (
    !name ||
    !AWS_ACCESS_KEY_ID ||
    !AWS_SECRET_ACCESS_KEY ||
    !AWS_DEFAULT_REGION ||
    !AWS_BUCKET ||
    !AWS_VERSION
  ) {
    res.status(401).json({
      message: "failed",
    });
  }
  const doc = await AmazonForm.create({
    name: name,
    AWS_ACCESS_KEY_ID: AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: AWS_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: AWS_DEFAULT_REGION,
    AWS_BUCKET: AWS_BUCKET,
    AWS_VERSION: AWS_VERSION,
  });
  res.status(201).json({
    message: "success",
    payload: {
      doc,
    },
  });
};
const getAmazonData = async (req, res) => {
  try {
    const doc = await AmazonForm.find({});
    return res.status(200).json({
      message: "success",

      doc,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const getDropBoxData = async (req, res) => {
  try {
    const doc = await DropBoxForm.find({});
    return res.status(200).json({
      message: "success",
      doc,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const getAzureData = async (req, res) => {
  try {
    const doc = await AzureForm.find({});
    return res.status(200).json({
      message: "success",
      doc,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const postDropBoxForm = async (req, res) => {
  const { name, DROPBOX_ACCESS_TOKEN, DROPBOX_PATH } = req.body;
  if (!name || !DROPBOX_ACCESS_TOKEN || !DROPBOX_PATH) {
    res.status(401).json({
      message: "failed",
    });
  }

  const doc = await DropBoxForm.create({
    name: name,
    DROPBOX_ACCESS_TOKEN: DROPBOX_ACCESS_TOKEN,
    DROPBOX_PATH: DROPBOX_PATH,
  });
  res.status(201).json({
    message: "success",
    payload: {
      doc,
    },
  });
};
const postAzureForm = async (req, res) => {
  const { name, AZURE_STORAGE_CONNECTION_STRING, AZURE_BLOB_LINK } = req.body;
  if (!name || !AZURE_STORAGE_CONNECTION_STRING || !AZURE_BLOB_LINK) {
    res.status(401).json({
      message: "failed",
    });
  }
  const doc = await AzureForm.create({
    name: name,
    AZURE_STORAGE_CONNECTION_STRING: AZURE_STORAGE_CONNECTION_STRING,
    AZURE_BLOB_LINK: AZURE_BLOB_LINK,
  });
  res.status(201).json({
    message: "success",
    payload: {
      doc,
    },
  });
};
const postDriveForm = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const {
    name,
    googledriveclientid,
    googledriveclientsecret,
    googledrivefolderid,
    refreshToken,
  } = req.body;
  if (
    !name ||
    !googledriveclientid ||
    !googledriveclientsecret ||
    !googledrivefolderid ||
    !refreshToken
  ) {
    res.status(400).json({
      message: "failed",
    });
  }
  // const CLIENTID = await bcrypt.hash(googledriveclientid, salt);
  // const CLIENTSECRET = await bcrypt.hash(googledriveclientsecret, salt);
  // const TOKEN = await bcrypt.hash(refreshToken, salt);
  const doc = await DriveForm.create({
    name: name,
    googledriveclientid: googledriveclientid,
    googledriveclientsecret: googledriveclientsecret,
    googledrivefolderid: googledrivefolderid,
    refreshToken: refreshToken,
  });
  res.status(201).json({
    message: "success",
    payload: {
      doc,
    },
  });
};
const getDriveData = async (req, res) => {
  try {
    const doc = await DriveForm.find({});
    return res.status(200).json({
      message: "success",

      doc,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// const getCounter = async (req, res) => {
//   try {
//     const doc = await FileDrive.find({});
//     res.status(200).json({
//       status: "success",
//       result: doc.length,
//     });
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// };
const postLocalServerForm = async (req, res) => {
  const { name, ip, username, password, port, path } = req.body;
  if (!name || !ip || !username || !password || !port || !path) {
    res.status(401).json({
      message: "failed",
    });
  }
  const doc = await LocalForm.create({
    name: name,
    ip: ip,
    username: username,
    password: password,
    port: port,
    path: path,
  });
  res.status(201).json({
    message: "success",
    data: {
      doc,
    },
  });
};
const postDistantServerForm = async (req, res) => {
  const { name, ip, username, password, port, path } = req.body;
  if (!name || !ip || !username || !password || !port || !path) {
    res.status(401).json({
      message: "failed",
    });
  }
  const doc = await DistantForm.create({
    name: name,
    ip: ip,
    username: username,
    password: password,
    port: port,
    path: path,
  });
  res.status(201).json({
    message: "success",
    data: {
      doc,
    },
  });
};
const getLocalServerData = async (req, res) => {
  try {
    const doc = await LocalForm.find({});
    return res.status(200).json({
      message: "success",

      doc,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const getDistantServerData = async (req, res) => {
  try {
    const doc = await DistantForm.find({});
    return res.status(200).json({
      message: "success",

      doc,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  postAmazonForm,
  postDropBoxForm,
  postAzureForm,
  getAmazonData,
  getDropBoxData,
  getAzureData,
  postDriveForm,
  getDriveData,
  postLocalServerForm,
  postDistantServerForm,
  getLocalServerData,
  getDistantServerData,
};
