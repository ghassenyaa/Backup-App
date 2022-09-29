import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import { useLocation } from "react-router-dom";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
} from "@material-ui/core";

import {
  postBackupAmazon,
  postBackupDropBox,
  postBackupAzure,
  fetchAmazonData,
  fetchAzureData,
  fetchDropBoxData,
  getconfigId,
  postBackupDrive,
  fetchDriveData,
  postBackupLocalServer,
  postBackupDistantServer,
  fetchLocalServerData,
  fetchDistantServerData,
  getfirstId,
  getfolderid,
  getnameUser,
  getnameafterconfig,
  savecredentieldrive,
  savedropboxToken,
} from "../../slices/form";
import {
  fetchDriveFiles,
  fetchDropBoxFiles,
  postfilesdrivetodropbox,
  postfilesdropboxtodrive,
  getfilesdrives,
  getfilesdropbox,
} from "../../slices/backupService";
import { useDispatch } from "react-redux";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import { useSelector } from "react-redux";
import "./_index.scss";

const useStyles = makeStyles(() => ({
  root: {
    "& fieldset": {
      borderRadius: "25px",
    },
  },
}));
const ConfigForm = ({ className, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const data = location.state;
  const { id, firstId, folderid, name, nameconfig, dropboxToken, DriveInfo } =
    useSelector((state) => state.form);
  const { filesDrives, driveData, filesDropBox } = useSelector(
    (state) => state.services
  );

  console.log("driveData", driveData);
  console.log("filesDropBox", filesDropBox);

  const [selectedValue, setSelectedValue] = useState();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const handleSelectChange = (e) => {
    setSelectedValue(e.value);
  };
  const {
    amazon,
    dropbox,
    azure,
    drive,
    localserveur,
    distantserveur,
    formconfig,
  } = useSelector((state) => state.form);

  useEffect(() => {
    if (id === "amazon") {
      dispatch(fetchAmazonData());
    }
    if (id === "azure") {
      dispatch(fetchAzureData());
    }
    if (id === "dropbox") {
      dispatch(fetchDropBoxData());
    }
    if (id === "drive") {
      dispatch(fetchDriveData());
    }
    if (id === "local") {
      dispatch(fetchLocalServerData());
    }
    if (id === "distant") {
      dispatch(fetchDistantServerData());
    }
  }, [id, dispatch]);

  const AmazonuserName = amazon?.doc?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });

  const AzureuserName = azure?.doc?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const Dropboxusername = dropbox?.doc?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const Driveusername = drive?.doc?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const Localusername = localserveur?.doc?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  const Distantusername = distantserveur?.doc?.map((item) => {
    return {
      value: item._id,
      label: item.name,
    };
  });
  if (amazon) {
  }
  const userAmazonexist = amazon?.doc?.find((el) => el._id === selectedValue);
  const PKey = userAmazonexist?.AWS_SECRET_ACCESS_KEY;
  const Pukey = userAmazonexist?.AWS_ACCESS_KEY_ID;
  const AWS_DEFAULT_REGION = userAmazonexist?.AWS_DEFAULT_REGION;
  const AWS_BUCKET = userAmazonexist?.AWS_BUCKET;
  const AWS_VERSION = userAmazonexist?.AWS_VERSION;
  const Name = userAmazonexist?.name;

  const userDropBoxexist = dropbox?.doc?.find((el) => el._id === selectedValue);
  const Token = userDropBoxexist?.DROPBOX_ACCESS_TOKEN;
  const SecretToken = userDropBoxexist?.DROPBOX_PATH;
  const NameUser = userDropBoxexist?.name;
  const userAzureexist = azure?.doc?.find((el) => el._id === selectedValue);
  const ConnectionString = userAzureexist?.AZURE_STORAGE_CONNECTION_STRING;
  const azurebloblink = userAzureexist?.AZURE_BLOB_LINK;
  const UserAzure = userAzureexist?.name;
  const userDriveexist = drive?.doc?.find((el) => el._id === selectedValue);
  const googledriveclientid = userDriveexist?.googledriveclientid;
  const googledriveclientsecret = userDriveexist?.googledriveclientsecret;
  const refresh_token = userDriveexist?.refreshToken;
  const UserDrive = userDriveexist?.name;
  const userLocalServerexist = localserveur?.doc?.find(
    (el) => el._id === selectedValue
  );
  const ip = userLocalServerexist?.ip;
  const username = userLocalServerexist?.username;
  const password = userLocalServerexist?.password;
  const port = userLocalServerexist?.port;
  const path = userLocalServerexist?.path;
  const UserLocal = userLocalServerexist?.name;
  const userDistantServerexist = distantserveur?.doc?.find(
    (el) => el._id === selectedValue
  );
  const ipDistant = userDistantServerexist?.ip;
  const usernameDistant = userDistantServerexist?.username;
  const passwordDistant = userDistantServerexist?.password;
  const portDistant = userDistantServerexist?.port;
  const pathDistant = userDistantServerexist?.path;
  let UserDistant = userDistantServerexist?.name;

  return (
    <Formik
      initialValues={{
        name: "",
        awsAccessKeyId: "",
        awsSecretAccessKey: "",
        awsDefaultRegion: "",
        awsBucket: "",
        awsVersion: "",
        token: "",
        secrettoken: "",
        connectionstring: "",
        azurebloblink: "",
        googledriveclientid: "",
        googledriveclientsecret: "",
        refreshtoken: "",
        googledrivefolderid: "",
        ip: "",
        username: "",
        password: "",
        port: "",
        path: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape(
        data.ID === "amazon" && !selectedValue
          ? {
              name: Yup.string().max(255).required("Name is required"),
              awsAccessKeyId: Yup.string()
                .max(255)
                .required("aws Access Key Id is required"),
              awsSecretAccessKey: Yup.string()
                .max(255)
                .required(" aws Secret Access Key is required"),
              awsDefaultRegion: Yup.string()
                .max(255)
                .required("aws Default Region is required"),
              awsBucket: Yup.string()
                .max(255)
                .required("aws Bucket is required"),
              awsVersion: Yup.string()
                .max(255)
                .required("aws Version is required"),
            }
          : data.ID === "dropbox" && !selectedValue
          ? {
              name: Yup.string().max(255).required("Name is required"),
              token: Yup.string().max(255).required("Token  is required"),
              secrettoken: Yup.string()
                .max(255)
                .required("Secret Token  is required"),
            }
          : data.ID === "azure" && !selectedValue
          ? {
              name: Yup.string().max(255).required("Name is required"),
              connectionstring: Yup.string()
                .max(255)
                .required("Connection String  is required"),
              azurebloblink: Yup.string()
                .max(255)
                .required("Connection String  is required"),
            }
          : data.ID === "drive" && !selectedValue
          ? {
              name: Yup.string().max(255).required("Name is required"),
              googledriveclientid: Yup.string()
                .max(255)
                .required("Google drive client id is required"),
              googledriveclientsecret: Yup.string()
                .max(255)
                .required("Google drive client secret Token  is required"),
              googledrivefolderid: Yup.string()
                .max(255)
                .required("Google drive folder id  is required"),
              refreshtoken: Yup.string()
                .max(255)
                .required("Refresh Token is required"),
            }
          : (data.ID === "local" || data.ID === "distant") && !selectedValue
          ? {
              name: Yup.string().max(255).required("Name is required"),
              ip: Yup.string().max(255).required("Adress ip  is required"),
              username: Yup.string()
                .max(255)
                .required(" user name  is required"),
              password: Yup.string().max(255).required(" password is required"),

              port: Yup.string().max(255).required(" Port  is required"),
              path: Yup.string().max(255).required(" Path is required"),
            }
          : ""
      )}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm }
      ) => {
        try {
          if (!formconfig && id === "drive") {
            dispatch(getfirstId("drive"));
            dispatch(getfolderid(values.googledrivefolderid));

            selectedValue
              ? dispatch(getnameUser(UserDrive))
              : dispatch(getnameUser(values.name));
            dispatch(
              savecredentieldrive({
                CLIENTID: selectedValue
                  ? googledriveclientid
                  : values.googledriveclientid,
                CLIENTSECRET: selectedValue
                  ? googledriveclientsecret
                  : values.googledriveclientsecret,
                REFRESHTOKEN: selectedValue
                  ? refresh_token
                  : values.refreshtoken,
              })
            );
            dispatch(
              getfilesdrives({
                params: {
                  folderId: values.googledrivefolderid,
                  name: selectedValue ? UserDrive : values.name,
                },
                body: {
                  CLIENTID: selectedValue
                    ? googledriveclientid
                    : values.googledriveclientid,
                  CLIENTSECRET: selectedValue
                    ? googledriveclientsecret
                    : values.googledriveclientsecret,
                  REFRESHTOKEN: selectedValue
                    ? refresh_token
                    : values.refreshtoken,
                },
              })
            );
          }
          if (!formconfig && id === "dropbox") {
            dispatch(getfirstId("dropbox"));
            dispatch(savedropboxToken(selectedValue ? Token : values.token));
            selectedValue
              ? dispatch(getnameafterconfig(NameUser))
              : dispatch(getnameafterconfig(values.name));
            dispatch(
              getfilesdropbox({
                params: { name: selectedValue ? NameUser : values.name },
                body: {
                  TOKEN: selectedValue ? Token : values.token,
                  path: `/${values.secrettoken}`,
                },
              })
            );
          }

          if (formconfig && id === "drive") {
            if (firstId === "drive") {
              for (let i = 0; i < filesDrives.files.length; i++) {
                dispatch(
                  fetchDriveFiles({
                    params: {
                      folderId: values.googledrivefolderid,
                      service: "drive",
                      name: name,
                    },
                    body: {
                      CLIENTID: selectedValue
                        ? googledriveclientid
                        : values.googledriveclientid,
                      CLIENTSECRET: selectedValue
                        ? googledriveclientsecret
                        : values.googledriveclientsecret,
                      REFRESHTOKEN: selectedValue
                        ? refresh_token
                        : values.refreshtoken,
                      el: filesDrives.files[i],
                    },
                  })
                );
              }
            }
            if (firstId === "dropbox") {
              filesDropBox.files.map((el) => {
                dispatch(
                  postfilesdropboxtodrive({
                    params: {
                      service: "drive",
                      user: nameconfig,
                      name: selectedValue ? UserDrive : values.name,
                    },
                    body: {
                      TOKEN: dropboxToken,
                      CLIENTID: selectedValue
                        ? googledriveclientid
                        : values.googledriveclientid,
                      CLIENTSECRET: selectedValue
                        ? googledriveclientsecret
                        : values.googledriveclientsecret,
                      REFRESHTOKEN: selectedValue
                        ? refresh_token
                        : values.refreshtoken,
                      el: el,
                    },
                  })
                );
              });
            }
          }
          if (formconfig && id === "dropbox") {
            if (firstId === "drive") {
              for (let i = 0; i < filesDrives.files.length; i++) {
                dispatch(
                  postfilesdrivetodropbox({
                    params: {
                      folderId: folderid,
                      service: "dropbox",
                      name: name,
                      user: selectedValue ? NameUser : values.name,
                    },
                    body: {
                      TOKEN: selectedValue ? Token : values.token,
                      CLIENTID: DriveInfo.CLIENTID.CLIENTID,
                      CLIENTSECRET: DriveInfo.CLIENTSECRET.CLIENTSECRET,
                      REFRESHTOKEN: DriveInfo.REFRESHTOKEN.REFRESHTOKEN,
                      el: filesDrives.files[i],
                      pathdb: values.secrettoken,
                    },
                  })
                );
              }
            }
            if (firstId === "dropbox") {
              dispatch(fetchDropBoxData());
              filesDropBox.files.map((el) => {
                console.log("eeeeellllll", el);
                dispatch(
                  fetchDropBoxFiles({
                    params: {
                      service: "dropbox",
                      user: selectedValue ? NameUser : values.name,
                    },
                    body: {
                      TOKEN: selectedValue ? Token : values.token,
                      el: el,
                      pathupload: values.secrettoken,
                    },
                  })
                );
              });
            }
          }
          if (id === "amazon" && !selectedValue) {
            dispatch(
              postBackupAmazon({
                name: values.name,
                AWS_ACCESS_KEY_ID: values.awsAccessKeyId,
                AWS_SECRET_ACCESS_KEY: values.awsSecretAccessKey,
                AWS_DEFAULT_REGION: values.awsDefaultRegion,
                AWS_BUCKET: values.awsBucket,
                AWS_VERSION: values.awsVersion,
              })
            );
          }

          if (id === "azure" && !selectedValue) {
            dispatch(
              postBackupAzure({
                name: values.name,
                AZURE_STORAGE_CONNECTION_STRING: values.connectionstring,
                AZURE_BLOB_LINK: values.azurebloblink,
              })
            );
          }
          if (id === "drive" && !selectedValue) {
            dispatch(
              postBackupDrive({
                name: values.name,
                googledriveclientid: values.googledriveclientid,
                googledriveclientsecret: values.googledriveclientsecret,
                googledrivefolderid: values.googledrivefolderid,
                refreshToken: values.refreshtoken,
              })
            );
          }
          if (id === "local" && !selectedValue) {
            dispatch(
              postBackupLocalServer({
                name: values.name,
                ip: values.ip,
                username: values.username,
                password: values.password,
                port: values.port,
                path: values.path,
              })
            );
          }
          if (id === "distant" && !selectedValue) {
            dispatch(
              postBackupDistantServer({
                name: values.name,
                ip: values.ip,
                username: values.username,
                password: values.password,
                port: values.port,
                path: values.path,
              })
            );
          }
          if (id === "dropbox" && !selectedValue) {
            dispatch(
              postBackupDropBox({
                name: values.name,
                DROPBOX_ACCESS_TOKEN: values.token,
                DROPBOX_PATH: values.secrettoken,
              })
            );
          }

          dispatch(getconfigId("done"));

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            resetForm();
          }
        } catch (err) {
          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
            resetForm();
          }
        }
        resetForm({ values: "" });
        history.push("/");
        {
          formconfig && history.push("/uploadfile");
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
        resetForm,
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            {" "}
            Select From :
          </label>
          <Select
            options={
              data.ID === "amazon"
                ? AmazonuserName
                : data.ID === "dropbox"
                ? Dropboxusername
                : data.ID === "azure"
                ? AzureuserName
                : data.ID === "drive"
                ? Driveusername
                : data.ID === "local"
                ? Localusername
                : data.ID === "distant"
                ? Distantusername
                : ""
            }
            value={(data.ID === "amazon"
              ? AmazonuserName
              : data.ID === "dropbox"
              ? Dropboxusername
              : data.ID === "azure"
              ? AzureuserName
              : data.ID === "drive"
              ? Driveusername
              : data.ID === "local"
              ? Localusername
              : data.ID === "distant"
              ? Distantusername
              : ""
            )?.find((obj) => obj._id === selectedValue)}
            onChange={handleSelectChange}
          />
          <div style={{ marginTop: "60px", marginBottom: "20px" }}>
            {!selectedValue && (
              <label
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#ff0000",
                }}
              >
                Create New
              </label>
            )}
          </div>
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            Name:
          </label>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            helperText={touched.name && errors.name}
            placeholder="name"
            margin="normal"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={
              data.ID === "amazon" && selectedValue
                ? Name
                : data.ID === "dropbox" && selectedValue
                ? NameUser
                : data.ID === "azure" && selectedValue
                ? UserAzure
                : data.ID === "drive" && selectedValue
                ? UserDrive
                : data.ID === "local"
                ? UserLocal
                : data.ID === "distant"
                ? UserDistant
                : values.name
            }
            variant="outlined"
          />

          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            {data.ID === "amazon"
              ? " AWS_SECRET_ACCESS_KEY:"
              : data.ID === "azure"
              ? "AZURE_STORAGE_CONNECTION_STRING:"
              : data.ID === "dropbox"
              ? "DROPBOX_ACCESS_TOKEN:"
              : data.ID === "drive"
              ? "GOOGLE_DRIVE_CLIENT_ID:"
              : data.ID === "local" || data.ID === "distant"
              ? "IP:"
              : ""}
          </label>

          {data.ID === "amazon" && (
            <TextField
              error={Boolean(
                touched.awsSecretAccessKey && errors.awsSecretAccessKey
              )}
              fullWidth
              helperText={
                touched.awsSecretAccessKey && errors.awsSecretAccessKey
              }
              placeholder={"Aws Secret Access Key"}
              margin="normal"
              name="awsSecretAccessKey"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? PKey : values.awsSecretAccessKey}
              variant="outlined"
            />
          )}

          {data.ID === "dropbox" && (
            <TextField
              error={Boolean(touched.token && errors.token)}
              fullWidth
              helperText={touched.token && errors.token}
              placeholder={"token"}
              margin="normal"
              name="token"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? Token : values.token}
              variant="outlined"
            />
          )}

          {data.ID === "azure" && (
            <TextField
              error={Boolean(
                touched.connectionstring && errors.connectionstring
              )}
              fullWidth
              helperText={touched.connectionstring && errors.connectionstring}
              placeholder={"Connection string"}
              margin="normal"
              name="connectionstring"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? ConnectionString : values.connectionstring}
              variant="outlined"
            />
          )}

          {data.ID === "drive" && (
            <TextField
              error={Boolean(
                touched.googledriveclientid && errors.googledriveclientid
              )}
              fullWidth
              helperText={
                touched.googledriveclientid && errors.googledriveclientid
              }
              placeholder={"google drive clientid"}
              margin="normal"
              name="googledriveclientid"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                selectedValue ? googledriveclientid : values.googledriveclientid
              }
              variant="outlined"
            />
          )}
          {(data.ID === "local" || data.ID === "distant") && (
            <TextField
              error={Boolean(touched.ip && errors.ip)}
              fullWidth
              helperText={touched.ip && errors.ip}
              placeholder={"Ip Adress"}
              margin="normal"
              name="ip"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                data.ID === "local" && selectedValue
                  ? ip
                  : data.ID === "distant" && selectedValue
                  ? ipDistant
                  : values.ip
              }
              variant="outlined"
            />
          )}

          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            {data.ID === "amazon"
              ? "AWS_ACCESS_KEY_ID:"
              : data.ID === "dropbox"
              ? "DROPBOX_PATH:"
              : data.ID === "drive"
              ? "GOOGLE_DRIVE_CLIENT_SECRET:"
              : data.ID === "azure"
              ? "AZURE_BLOB_LINK:"
              : data.ID === "local" || id === "distant"
              ? "USER NAME:"
              : ""}
          </label>

          {data.ID === "amazon" && (
            <TextField
              error={Boolean(touched.awsAccessKeyId && errors.awsAccessKeyId)}
              fullWidth
              helperText={touched.awsAccessKeyId && errors.awsAccessKeyId}
              placeholder={"Aws Access Key Id"}
              margin="normal"
              name="awsAccessKeyId"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? Pukey : values.awsAccessKeyId}
              variant="outlined"
            />
          )}
          {data.ID === "dropbox" && (
            <TextField
              error={Boolean(touched.secrettoken && errors.secrettoken)}
              fullWidth
              helperText={touched.secrettoken && errors.secrettoken}
              placeholder={"DropBox path"}
              margin="normal"
              name="secrettoken"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.secrettoken}
              variant="outlined"
            />
          )}
          {data.ID === "drive" && (
            <TextField
              error={Boolean(
                touched.googledriveclientsecret &&
                  errors.googledriveclientsecret
              )}
              fullWidth
              helperText={
                touched.googledriveclientsecret &&
                errors.googledriveclientsecret
              }
              placeholder={"goole drive client secret"}
              margin="normal"
              name="googledriveclientsecret"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                selectedValue
                  ? googledriveclientsecret
                  : values.googledriveclientsecret
              }
              variant="outlined"
            />
          )}
          {(data.ID === "local" || data.ID === "distant") && (
            <TextField
              error={Boolean(touched.username && errors.username)}
              fullWidth
              helperText={touched.username && errors.username}
              placeholder={"User Name"}
              margin="normal"
              name="username"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                data.ID === "local" && selectedValue
                  ? username
                  : data.ID === "distant" && selectedValue
                  ? usernameDistant
                  : values.username
              }
              variant="outlined"
            />
          )}
          {data.ID === "azure" && (
            <TextField
              error={Boolean(touched.azurebloblink && errors.azurebloblink)}
              fullWidth
              helperText={touched.azurebloblink && errors.azurebloblink}
              placeholder={"Azure Blob Link"}
              margin="normal"
              name="azurebloblink"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? azurebloblink : values.azurebloblink}
              variant="outlined"
            />
          )}
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            {data.ID === "drive"
              ? "GOOGLE_DRIVE_FOLDER_ID:"
              : data.ID === "amazon"
              ? "AWS_DEFAULT_REGION:"
              : data.ID === "local" || id === "distant"
              ? "PASSWORD:"
              : ""}
          </label>

          {data.ID === "drive" && (
            <TextField
              error={Boolean(
                touched.googledrivefolderid && errors.googledrivefolderid
              )}
              fullWidth
              helperText={
                touched.googledrivefolderid && errors.googledrivefolderid
              }
              placeholder={"google drive folder id"}
              margin="normal"
              name="googledrivefolderid"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.googledrivefolderid}
              variant="outlined"
            />
          )}
          {data.ID === "amazon" && (
            <TextField
              error={Boolean(
                touched.awsDefaultRegion && errors.awsDefaultRegion
              )}
              fullWidth
              helperText={touched.awsDefaultRegion && errors.awsDefaultRegion}
              placeholder={"Aws Default Region"}
              margin="normal"
              name="awsDefaultRegion"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                selectedValue ? AWS_DEFAULT_REGION : values.awsDefaultRegion
              }
              variant="outlined"
            />
          )}
          {(id === "local" || id === "distant") && (
            <TextField
              error={Boolean(touched.password && errors.password)}
              fullWidth
              helperText={touched.password && errors.password}
              placeholder={"password"}
              margin="normal"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={
                data.ID === "local" && selectedValue
                  ? password
                  : data.ID === "distant" && selectedValue
                  ? passwordDistant
                  : values.password
              }
              variant="outlined"
            />
          )}
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            {data.ID === "amazon"
              ? "AWS_BUCKET:"
              : data.ID === "local" || data.ID === "distant"
              ? "PORT:"
              : data.ID === "drive"
              ? "REFRESH TOKEN:"
              : ""}
          </label>
          {data.ID === "amazon" && (
            <TextField
              error={Boolean(touched.awsBucket && errors.awsBucket)}
              fullWidth
              helperText={touched.awsBucket && errors.awsBucket}
              placeholder={"Aws Bucket"}
              margin="normal"
              name="awsBucket"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? AWS_BUCKET : values.awsBucket}
              variant="outlined"
            />
          )}
          {data.ID === "drive" && (
            <TextField
              error={Boolean(touched.refreshtoken && errors.refreshtoken)}
              fullWidth
              helperText={touched.refreshtoken && errors.refreshtoken}
              placeholder={"refresh token"}
              margin="normal"
              name="refreshtoken"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? refresh_token : values.refreshtoken}
              variant="outlined"
            />
          )}
          {(data.ID === "local" || data.ID === "distant") && (
            <TextField
              error={Boolean(touched.port && errors.port)}
              fullWidth
              helperText={touched.port && errors.port}
              placeholder={"Port"}
              margin="normal"
              name="port"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                data.ID === "local" && selectedValue
                  ? port
                  : data.ID === "distant" && selectedValue
                  ? portDistant
                  : values.port
              }
              variant="outlined"
            />
          )}
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              color: "#2E6FF1",
            }}
          >
            {data.ID === "amazon"
              ? "AWS_VERSION:"
              : data.ID === "local" || id === "distant"
              ? "PATH:"
              : ""}
          </label>
          {data.ID === "amazon" && (
            <TextField
              error={Boolean(touched.awsVersion && errors.awsVersion)}
              fullWidth
              helperText={touched.awsVersion && errors.awsVersion}
              placeholder={"Aws Version"}
              margin="normal"
              name="awsVersion"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={selectedValue ? AWS_VERSION : values.awsVersion}
              variant="outlined"
            />
          )}
          {(id === "local" || id === "distant") && (
            <TextField
              error={Boolean(touched.path && errors.path)}
              fullWidth
              helperText={touched.path && errors.path}
              placeholder={"¨Path"}
              margin="normal"
              name="path"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={
                data.ID === "local" && selectedValue
                  ? path
                  : data.ID === "distant" && selectedValue
                  ? pathDistant
                  : values.path
              }
              variant="outlined"
            />
          )}

          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}
          <Box mt={2} style={{ margin: "auto" }}>
            <Button
              style={{
                backgroundColor: "#489BFF",
                color: "#FFFFFF",
                borderRadius: "30px",
                width: "150px",
              }}
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Next
            </Button>
            <Button
              style={{
                backgroundColor: "#489BFF",
                color: "#FFFFFF",
                borderRadius: "30px",
                width: "150px",
              }}
              fullWidth
              size="large"
              type="reset"
              variant="contained"
              onClick={() => {
                resetForm();
              }}
            >
              Reset
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
export default ConfigForm;
