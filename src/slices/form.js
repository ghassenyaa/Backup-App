import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { fetchDropBoxFiles, fetchDriveFiles } from "./backupService";

const initialState = {
  id: "",
  amazon: [],
  dropboxs: [],
  azure: [],
  drives: [],
  localserveur: [],
  distantserveur: [],
  statusAmazon: "idle",
  statusDropBox: "idle",
  statusAzure: "idle",
  statusDrive: "idle",
  statusLocal: "idle",
  statusDistant: "idle",
  formconfig: "",
  firstId: "",
  folderid: "",
  name: "",
  nameconfig: "",
  DriveInfo: {
    CLIENTID: "",
    CLIENTSECRET: "",
    REFRESHTOKEN: "",
  },
  dropboxToken: "",
};

export const postBackupAmazon = createAsyncThunk(
  "backups/postBackupAmazon",
  async (body) => {
    let data;
    try {
      const response = await axios.post(`/backups/amazon`, body);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const fetchAmazonData = createAsyncThunk(
  "backups/fetchAmazonData ",
  async () => {
    let data;
    try {
      const response = await axios.get(`/backups/amazon`);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const postBackupDropBox = createAsyncThunk(
  "backups/postBackupDropBox",
  async (body, thunkApi) => {
    let data;
    try {
      const response = await axios.post(`/backups/dropbox`, body);
      data = await response.data.payload.doc;

      if (response.status === 200) {
        thunkApi.dispatch(
          fetchDropBoxFiles({
            params: {
              service: "dropbox",
              user: data.name,
            },
            body: {
              TOKEN: data.DROPBOX_ACCESS_TOKEN,
            },
          })
        );
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const fetchDropBoxData = createAsyncThunk(
  "backups/fetchDropBoxData ",
  async () => {
    let data;
    try {
      const response = await axios.get(`/backups/dropbox`);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const postBackupAzure = createAsyncThunk(
  "backups/postBackupAzure",
  async (body) => {
    let data;
    try {
      const response = await axios.post(`/backups/azure`, body);
      data = await response.data;

      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const fetchAzureData = createAsyncThunk(
  "backups/fetchAzureData ",
  async () => {
    let data;
    try {
      const response = await axios.get(`/backups/azure`);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const postBackupDrive = createAsyncThunk(
  "backups/postBackupDrive",
  async (body, thunkAPi) => {
    let data;
    try {
      const response = await axios.post(`/backups/drive`, body);
      data = await response.data.payload.doc;
      console.log(data);
      if (response.status === 200) {
        thunkAPi.dispatch(
          fetchDriveFiles({
            params: {
              folderId: data.googledrivefolderid,
              service: "drive",
              name: data.name,
            },
            body: {
              CLIENTID: data.googledriveclientid,
              CLIENTSECRET: data.googledriveclientsecret,
              REFRESHTOKEN: data.refreshToken,
            },
          })
        );
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const fetchDriveData = createAsyncThunk(
  "backups/fetchDriveData ",
  async () => {
    let data;
    try {
      const response = await axios.get(`/backups/drive`);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const postBackupLocalServer = createAsyncThunk(
  "backups/postBackupLocalServer",
  async (body) => {
    let data;
    try {
      const response = await axios.post(`/backups/localserveur`, body);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const fetchLocalServerData = createAsyncThunk(
  "backups/fetchLocalServerData ",
  async () => {
    let data;
    try {
      const response = await axios.get(`/backups/localserveur`);
      data = await response.data;
      console.log(data);
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const postBackupDistantServer = createAsyncThunk(
  "backups/postBackupDistantServer",
  async (body) => {
    let data;
    try {
      const response = await axios.post(`/backups/distantserveur`, body);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const fetchDistantServerData = createAsyncThunk(
  "backups/fetchDistantServerData ",
  async () => {
    let data;
    try {
      const response = await axios.get(`/backups/distantserveur`);
      data = await response.data;
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

const slice = createSlice({
  name: "form",
  initialState,
  reducers: {
    getId: (state, action) => {
      state.id = action.payload;
    },
    getconfigId: (state, action) => {
      state.formconfig = action.payload;
    },
    getfirstId: (state, action) => {
      state.firstId = action.payload;
    },
    getfolderid: (state, action) => {
      state.folderid = action.payload;
    },
    getnameUser: (state, action) => {
      state.name = action.payload;
    },
    getnameafterconfig: (state, action) => {
      state.nameconfig = action.payload;
    },
    savecredentieldrive: (state, action) => {
      state.DriveInfo.CLIENTID = action.payload;
      state.DriveInfo.CLIENTSECRET = action.payload;
      state.DriveInfo.REFRESHTOKEN = action.payload;
    },
    savedropboxToken: (state, action) => {
      state.dropboxToken = action.payload;
    },
  },
  extraReducers: {
    [fetchAmazonData.pending]: (state) => {
      state.statusAmazon = "loading";
    },
    [fetchAmazonData.fulfilled]: (state, action) => {
      state.statusAmazon = "succeeded";
      state.amazon = action.payload;
    },
    [fetchAmazonData.rejected]: (state, action) => {
      state.statusAmazon = "failed";
      state.error = action.payload;
    },
    [postBackupAmazon.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postBackupAmazon.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.amazon.push(action.payload.payload.amazon);
    },
    [postBackupAmazon.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [fetchDropBoxData.pending]: (state) => {
      state.statusDropBox = "loading";
    },
    [fetchDropBoxData.fulfilled]: (state, action) => {
      state.statusDropBox = "succeeded";
      state.dropbox = action.payload;
    },
    [fetchDropBoxData.rejected]: (state, action) => {
      state.statusDropBox = "failed";
      state.error = action.payload;
    },
    [postBackupDropBox.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postBackupDropBox.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.dropboxs.push(action.payload.payload.doc);
    },
    [postBackupDropBox.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [fetchAzureData.pending]: (state) => {
      state.statusAzure = "loading";
    },
    [fetchAzureData.fulfilled]: (state, action) => {
      state.statusAzure = "succeeded";
      state.azure = action.payload;
    },
    [fetchAzureData.rejected]: (state, action) => {
      state.statusAzure = "failed";
      state.error = action.payload;
    },
    [postBackupAzure.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postBackupAzure.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.azure.push(action.payload.payload.azure);
    },
    [postBackupAzure.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [fetchDriveData.pending]: (state) => {
      state.statusDrive = "loading";
    },
    [fetchDriveData.fulfilled]: (state, action) => {
      state.statusDrive = "succeeded";
      state.drive = action.payload;
    },
    [fetchDriveData.rejected]: (state, action) => {
      state.statusDrive = "failed";
      state.error = action.payload;
    },
    [postBackupDrive.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postBackupDrive.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.drives.push(action.payload.payload.doc);
    },
    [postBackupDrive.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [postBackupLocalServer.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postBackupLocalServer.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.localserveur.push(action.payload.payload.localserveur);
    },
    [postBackupLocalServer.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [postBackupDistantServer.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postBackupDistantServer.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.distantserveur.push(action.payload.payload.distantserveur);
    },
    [postBackupDistantServer.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [fetchLocalServerData.pending]: (state) => {
      state.statusLocal = "loading";
    },
    [fetchLocalServerData.fulfilled]: (state, action) => {
      state.statusLocal = "succeeded";
      state.localserveur = action.payload;
    },
    [fetchLocalServerData.rejected]: (state, action) => {
      state.statusLocal = "failed";
      state.error = action.payload;
    },
    [fetchDistantServerData.pending]: (state) => {
      state.statusDistant = "loading";
    },
    [fetchDistantServerData.fulfilled]: (state, action) => {
      state.statusDistant = "succeeded";
      state.distantserveur = action.payload;
    },
    [fetchDistantServerData.rejected]: (state, action) => {
      state.statusDistant = "failed";
      state.error = action.payload;
    },
  },
});
export const {
  getId,
  getconfigId,
  getfirstId,
  getfolderid,
  getnameUser,
  getnameafterconfig,
  savecredentieldrive,
  savedropboxToken,
} = slice.actions;
export const reducer = slice.reducer;

export default slice;
