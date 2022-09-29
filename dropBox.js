const main = require("./FilesDrive");
const DropBox = require("dropbox");
const fetch = require("node-fetch");
const fs = require("fs");
const DropBoxForm = require("./models/dropBox");
const DriveForm = require("./models/drive");
const { google } = require("googleapis");


async function auth(req, res, next) {
  try {
    let { name } = await req.params;
    const userdrive = await DriveForm.findOne({ name: name });
    const { CLIENTID, CLIENTSECRET, REFRESHTOKEN } = await req.body;
    if (
      CLIENTID !== userdrive.googledriveclientid ||
      CLIENTSECRET !== userdrive.googledriveclientsecret ||
      REFRESHTOKEN !== userdrive.refreshToken
    ) {
      res.status(400).json({
        status: "failed",
        message: "wrong credentiel",
      });
    } else {
      const CLIENT_ID = CLIENTID;
      const CLIENT_SECRET = CLIENTSECRET;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const REFRESH_TOKEN = REFRESHTOKEN;

      const oauth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
      );
      const drive = google.drive({
        version: "v3",
        auth: oauth2Client,
      });

      oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

      req.drive = drive;
      next();
    }
  } catch (error) {
    console.log(error);
  }
}
async function authdropbox(req, res, next) {
  try {
    const { user } = await req.params;
    const data = await DropBoxForm.findOne({ name: user });
    const { TOKEN } = req.body;

    if (TOKEN !== data?.DROPBOX_ACCESS_TOKEN) {
      res.status(400).json({
        status: "failed",
        message: "wrong credentiels",
      });
    } else {
      const dbx = new DropBox.Dropbox({
        accessToken: TOKEN,
        fetch,
      });

      req.dbx = dbx;
      req.DROPBOX_ACCESS_TOKEN = TOKEN;
      next();
    }
  } catch (error) {
    console.log(error);
  }
}

const state = {
  fiels: [],
  rootPath: "",
};
let files=[];
let filesFolder=[];
let status=0

const getFiles=async(req,res,next)=>{

  try {
    const result = await req.dbx.filesListFolder({
      path: state.rootPath,
      limit: 100,
    });
    result.entries.map((el)=>{
      files.push(el)
    })
    next()   
  } catch (error) {
res.status(400).json({
  message:"failed",
  error
})
    
  }
}
const getfilesFolder=async(req,res)=>{
  try {
    const {path}=await req.body
     await  req.dbx
      .filesListFolder({ path: `${path}` })
      .then(async (response) => { 
        response.entries.map((el)=>{
          filesFolder.push(el)         
        })      
        })
    
  
      res.status(200).json({
        files:filesFolder
      })  
  } catch (error) {
  res.status(200).json({
    message:"failed",
    error
  })
    
  }
  
  
}
const init = async (req, res, next) => {
  let counter = 0;
  const { service } = await req.params;
  let {el}=await req.body
  let {pathupload}=await req.body
  var writeStream = fs.createWriteStream("DropBoxHistory.txt");
  writeStream.write(
    `download files from drop box started at ${new Date().toISOString()}\n`
  );
  try {
       await downloadFiles(el.id, req.dbx);
        fs.appendFile(
          "DropBoxHistory.txt",
          `name:${
            el.name
          },Time download:${new Date().toISOString()},status:success download\n`,
          function (err) {
            if (err) throw err;
           
          }
        );    
          if (service === "dropbox") {
          status=  await uploadFiles(
              "/uploads/dropBoxUploads/",
              `/${pathupload}/`,
              el.name,
              req.DROPBOX_ACCESS_TOKEN
            );
            filesFolder=[];
           
                fs.appendFile(
          "DropBoxHistory.txt",
          `name:${
            el.name
          },Time Upload:${new Date().toISOString()},status:upload success\n`,
          function (err) {
            if (err) throw err;
         
          }
        );      
         res.status(200).json({
          result: filesFolder,
          status: status,
        });
            
          }
          if (service === "drive") {
         status=   await main.Scan(
              "/uploads/dropBoxUploads/",
              el.name,
             req. drive
            );
            filesFolder=[];
                fs.appendFile(
          "DropBoxHistory.txt",
          `name:${
            el.name
          },Time Upload:${new Date().toISOString()},status:upload success\n`,
          function (err) {
            if (err) throw err;
            
          }
        );
         res.status(200).json({
          result: filesFolder,
          status: status,
        });
          }
   
  } catch (error) {
    console.log(error);
  }
};
const axios = require("axios");
const uploadFiles = async (pathlocal, pathdb, name, DROPBOX_ACCESS_TOKEN) => {
  try {
 const file=   await axios({
      method: `POST`,
      url: `https://content.dropboxapi.com/2/files/upload`,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${DROPBOX_ACCESS_TOKEN}`,
        "Content-Type": "application/octet-stream",
        "Dropbox-API-Arg": `{"path":"${pathdb}${name}"}`, //file path of dropbox
      },
      data: fs.createReadStream(__dirname + `${pathlocal}${name}`), //local path to uploading file
      
    });
    status=file.status
    
    fs.unlink(__dirname + `${pathlocal}${name}`, function (err) {
      if (err) throw err; 
    });

  } catch (err) {
    return console.log(`X ${err.message}`);
  }
  return status
};

const downloadFiles = async (filePath, dbx) => {
  await dbx
    .filesDownload({ path: filePath })
    .then(async (data) => {
      fs.writeFile(
        `uploads/dropBoxUploads/${data.name}`,
        data.fileBinary,
        {
          encoding: "binary",
        },

        (err) => {
          if (err) {
            throw err;
          }
        }
      );
    })
    .catch((error) => {
      console.log("Error downloading the file ❎");
      console.log(error);
    });
};

async function DeleteFiles(req, res) {
  const { user } = await req.params;
  const data = await DropBoxForm.findOne({ name: user });
  const dbx = new DropBox.Dropbox({
    accessToken: data.DROPBOX_ACCESS_TOKEN,
    fetch,
  });
  filesFolder.map((doc) => {
    console.log(doc);
    dbx
      .filesDeleteV2({ path: `${doc.path_lower}` })
      .then(function (response) {})
      .catch(function (error) {
        console.error(error);
      });
  });
}
module.exports = {
  init,
  uploadFiles,
  DeleteFiles,
  authdropbox,
  auth,
  getFiles,
  getfilesFolder
};
