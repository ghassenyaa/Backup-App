const { google } = require("googleapis");
const { uploadFiles } = require("./dropBox");
const fs = require("fs");
const DriveForm = require("./models/drive");
const DropBoxForm = require("./models/dropBox");
const DropBox = require("dropbox");
const fetch = require("node-fetch");

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
        message: "wrong credentiels",
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
    const { TOKEN } = await req.body;
    if (TOKEN !== data.DROPBOX_ACCESS_TOKEN) {
      res.status(400).json({
        status: "failed",
        message: "wrong credentiel",
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

// Get credentials and build service

let files = [];

async function write(file,el, drive) {
  let status=0
  return new Promise((resolve, reject) => {
    file.on("finish", async function () {
      console.log("Download Completed");
      status = await uploadBasic(
        "/uploads/driveUploads/",
        el.name,
        drive
      );
    
    
      resolve(status);
      files = []
      fs.appendFile(
        "DriveHistory.txt",
        `name:${
          el.name
        },Time Upload:${new Date().toISOString()},status:upload success\n`,
        function (err) {
          if (err) throw err;
        }
      );
      return status
    });
    file.on("error", reject);
  });
  
} 
async function writeDropbox(file,el, dropbox,pathdb) {
  let status=0
  return new Promise((resolve, reject) => {  
    file.on("finish", async function () {
      file.close(); // close() is async, call cb after close completes.
      console.log("Download Completed");
    status=  await uploadFiles(
        "/uploads/driveUploads/",
        `/${pathdb}/`,
        el.name,
        dropbox
      );
      resolve(status);
      files = []
      
   
      fs.appendFile(
        "DriveHistory.txt",
        `name:${
          el.name
        },Time Upload:${new Date().toISOString()},status:upload success\n`,
        function (err) {
          if (err) throw err;
        }
      );
      return status;
    
    });
    file.on("error", reject);
  });
  
}




const counterDrive = async ( drive,el) => {
  let status
  
  var writeStream = fs.createWriteStream("DriveHistory.txt");
   writeStream.write(
     `download files from drive started at ${new Date().toISOString()}\n`
   );
    let file = fs.createWriteStream(`uploads/driveUploads/${el.name}`);
    await drive.files.get(
      {
        fileId: el.id,
        alt: "media",
        mimeType: el.mimeType,
      },
      { responseType: "stream" },

      async (err, res) => {
        await res.data.on("data", function (chunk) {
        
         
        }).pipe(file);
      }
    );
     fs.appendFile(
       "DriveHistory.txt",
      `name:${
      el.name
      },Time download:${new Date().toISOString()},status:success download\n`,
    function (err) {
    if (err) throw err;
     }
  );
status= await write(file, el, drive);    
return status
  
};
const counterdropbox=async(drive,dropbox,el,pathdb)=>{
  let status=0
  var writeStream = fs.createWriteStream("DriveHistory.txt");
  writeStream.write(
    `download files from drive started at ${new Date().toISOString()}\n`
  );
   let file = fs.createWriteStream(`uploads/driveUploads/${el.name}`);
   await drive.files.get(
     {
       fileId: el.id,
       alt: "media",
       mimeType: el.mimeType,
     },
     { responseType: "stream" },

     async (err, res) => {
       await res.data.on("data", function (chunk) {
  
       }).pipe(file);
      
     }
   );
    fs.appendFile(
      "DriveHistory.txt",
     `name:${
     el.name
     },Time download:${new Date().toISOString()},status:success download\n`,
   function (err) {
   if (err) throw err;
    }
 );

  
   status=await writeDropbox(file, el, dropbox,pathdb);    

   return status ;


}


const getfiles=async(req,res)=>{
  let { folderId } = await req.params;
  const result = await req.drive.files.list({
    fields: "nextPageToken, files(id,name,mimeType)",
    spaces: "drive",
    q: `'${folderId}' in parents and trashed=false`,
  });
  result.data.files.map(async (el) => {
    files.push(el);
  });
  res.status(200).json({
    files:files
  })

}

const searchFile = async (req, res) => {
  let status=0
  try {
    const {pathdb}=await req.body
    let { service } = await req.params;
    let {el}=await req.body
    if(service==="drive"){
      status= await counterDrive(req.drive,el);  
      res.status(200).json({
        files: files,
        status:status,
      })
    }
    if(service==="dropbox"){
      status= await  counterdropbox(req.drive,req.DROPBOX_ACCESS_TOKEN,el,pathdb);   
     res.status(200).json({
      files: files,
      status:status,
    })
    }

  
  } catch (err) {
    throw err;
  }
  
  
};


const uploadBasic = async (pathlocal, name, drive) => {
  let status=0
  const fs = require("fs");
  const folderId = "1JysguRvdonfwNCN7VoRLjcb7M11-yydK";

  const filedata = {
    name: name,
    parents: [folderId],
  };
  let media = {
    mimeType: "image/jpg,application/pdf, image/webp,application/zip",
    body: fs.createReadStream(__dirname +`${pathlocal}${name}`),
  };
  try {
    const file = await drive.files.create({
      resource: filedata,
      media: media,
      fields: "id",
    });
    status=file.status;
   
   

    fs.unlink(__dirname + `${pathlocal}${name}`, function (err) {
      if (err) throw err;
      
    });
  } catch (err) {
    throw err;
  }
  return status;
};



const deleteFiles = async (req, res) => {
  const { name } = await req.params;
  const userdrive = await DriveForm.findOne({ name: name });
  const CLIENT_ID = userdrive.googledriveclientid;
  const CLIENT_SECRET = userdrive.googledriveclientsecret;
  const REDIRECT_URI = process.env.REDIRECT_URI;
  const REFRESH_TOKEN = userdrive.refreshToken;

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

  files?.map((el) => {
    // Deleting  from Drive
    drive.files
      .delete({
        fileId: el.id,
      })

      .then(
        async function (response) {},
        function (err) {
          console.log(err);
          return res.status(400);
        }
      );
  });
};
exports.Scan = uploadBasic;

module.exports = { searchFile, auth, deleteFiles, authdropbox ,getfiles};
