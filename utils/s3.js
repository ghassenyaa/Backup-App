const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const aws = require("aws-sdk");

//configure the aws environment
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//initialize s3
const s3 = new aws.S3();

//constant params
const constantParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
};

//upload file to s3 bucker
exports.uploadToS3 = (file, next) => {
  const fileStream = fs.createReadStream(file.tempFilePath);

  const params = {
    ...constantParams,
    Body: fileStream,
    Key: file.name,
  };
  s3.upload(params, (error, data) => {
    console.log(error, data);
    next(error, data);
  });
};

//download file from s3 bucket
exports.getFileFromS3 = (key) => {
  const downloadParams = {
    Key: key,
    ...constantParams,
  };
  return s3.getObject(downloadParams).createReadStream();
};

//delete file from s3 bucker
exports.deleteFileFromS3 = (key, next) => {
  const deleteParams = {
    Key: key,
    ...constantParams,
  };
  s3.deleteObject(deleteParams, (error, data) => {
    next(error, data);
  });
};
