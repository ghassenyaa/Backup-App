import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

const initialState = {
  driveData: [],
  Data: [],
  dropboxData: [],
  filesDrives: {},
  filesDropBox: {},
  status: "idle",
  error: null,
  methode: "",
};

export const getfilesdrives = createAsyncThunk(
  "drive/getfilesdrives",
  async (obj) => {
    console.log(obj.body);
    let data;
    try {
      const response = await axios.post(
        `/drive/filesdrive/${obj.params.folderId}/${obj.params.name}`,
        obj.body
      );
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
export const getfilesdropbox = createAsyncThunk(
  "dropbox/getfilesdropbox",
  async (obj) => {
    console.log(obj.body);
    let data;
    try {
      const response = await axios.post(
        `/dropbox/allfiles/${obj.params.name}`,
        obj.body
      );
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

export const fetchDriveFiles = createAsyncThunk(
  "drive/fetchDriveFiles",
  async (obj) => {
    let data;
    try {
      const response = await axios.post(
        `/drive/searchfilesdrive/${obj.params.folderId}/${obj.params.service}/${obj.params.name}`,
        obj.body
      );

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
export const postfilesdrivetodropbox = createAsyncThunk(
  "drive/postfilesdrivetodropbox",
  async (obj) => {
    let data;

    try {
      const response = await axios.post(
        `/drive/drivetodropbox/${obj.params.folderId}/${obj.params.service}/${obj.params.name}/${obj.params.user}`,
        obj.body
      );
      data = await response.data;
      console.log("dataaaa", data);
      if ((response.status = 200)) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const postfilesdropboxtodrive = createAsyncThunk(
  "dropbox/postfilesdropboxtodrive",
  async (obj) => {
    let data;
    try {
      const response = await axios.post(
        `/dropbox/dropboxtodrive/${obj.params.service}/${obj.params.user}/${obj.params.name}`,
        obj.body
      );
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
export const fetchDropBoxFiles = createAsyncThunk(
  "dropbox/fetchDropBoxFiles",
  async (obj) => {
    console.log("objet", obj);
    let data;
    try {
      const response = await axios.post(
        `/dropbox/searchfilesdropbox/${obj.params.service}/${obj.params.user}`,
        obj.body
      );
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
export const postfilesDrive = createAsyncThunk(
  "drive/postfilesDrive",
  async (body) => {
    let data;
    try {
      const response = await axios.post(`/drive/uploadfiles`, body);
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
export const postfilesDropBox = createAsyncThunk(
  "dropbox/postfilesDropBox",
  async (body) => {
    let data;
    try {
      const response = await axios.post(`/dropbox/uplodesfilesdropBox`, body);
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
export const deletefilesdrive = createAsyncThunk(
  "drive/deletefilesdrive",
  async (name) => {
    let data;

    try {
      const response = await axios.delete(`/drive/deletefiles/${name}`);
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
export const deletefilesdropbox = createAsyncThunk(
  "dropbox/deletefilesdropbox",
  async (name) => {
    let data;

    try {
      const response = await axios.delete(`/dropbox/deletefiles/${name}`);
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
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDriveFiles.pending]: (state) => {
      state.status = "loading";
    },
    [fetchDriveFiles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.driveData.push(action.payload);
    },
    [fetchDriveFiles.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getfilesdrives.pending]: (state) => {
      state.status = "loading";
    },
    [getfilesdrives.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.filesDrives = action.payload;
    },
    [getfilesdrives.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [postfilesDrive.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postfilesDrive.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.methode = action.payload;
    },
    [postfilesDrive.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [fetchDropBoxFiles.pending]: (state) => {
      state.status = "loading";
    },
    [fetchDropBoxFiles.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.dropboxData.push(action.payload);
    },
    [fetchDropBoxFiles.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [getfilesdropbox.pending]: (state) => {
      state.status = "loading";
    },
    [getfilesdropbox.fulfilled]: (state, action) => {
      state.status = "succeeded";
      console.log(action.payload);
      state.filesDropBox = action.payload;
    },
    [getfilesdropbox.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [postfilesDropBox.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postfilesDropBox.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      state.methode = action.payload;
    },
    [postfilesDropBox.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [deletefilesdrive.pending]: (state) => {
      state.status = "loading";
    },
    [deletefilesdrive.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [deletefilesdrive.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [deletefilesdropbox.pending]: (state) => {
      state.status = "loading";
    },
    [deletefilesdropbox.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [deletefilesdropbox.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [postfilesdrivetodropbox.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postfilesdrivetodropbox.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      console.log(action.payload);
      state.driveData.push(action.payload);
    },
    [postfilesdrivetodropbox.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
    [postfilesdropboxtodrive.pending]: (state) => {
      state.poststatus = "loading";
    },
    [postfilesdropboxtodrive.fulfilled]: (state, action) => {
      state.poststatus = "succeeded";
      console.log(action.payload);
      state.dropboxData.push(action.payload);
    },
    [postfilesdropboxtodrive.rejected]: (state, action) => {
      state.poststatus = "failed";
      state.error = action.payload;
    },
  },
});

export const reducer = slice.reducer;

export default slice;
