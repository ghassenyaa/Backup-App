import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { Card, Checkbox } from "@material-ui/core";
import "./_index.scss";
import generate from "./../../assets/icons/generate.png";
import { useSelector, useDispatch } from "react-redux";

import {
  deletefilesdrive,
  deletefilesdropbox,
} from "../../slices/backupService";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

function FacebookCircularProgress(props) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) =>
            theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: (theme) =>
            theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  );
}

export default function CustomizedProgressBars() {
  let counter = 0;
  const { firstId, name, nameconfig } = useSelector((state) => state.form);
  const { driveData, filesDrives, dropboxData, filesDropBox } = useSelector(
    (state) => state.services
  );

  driveData.map((el) => {
    if (el.status === 200) {
      counter++;
      console.log(counter);
      
    }
  });
  dropboxData.map((el) => {
    if (el.status === 200) {
      counter++;
      console.log(counter);
    }
  });

  const dispatch = useDispatch();

  return (
    <>
      <Card className="wrapper-progress">
        <div className="wrapper-file-size-files-backups">
          <span className="file-backup">Files:</span>
          {firstId === "drive" && (
            <span className="file-size-backup">
              {counter}/{filesDrives?.files?.length}
            </span>
          )}
          {firstId === "dropbox" && (
            <span className="file-size-backup">
              {counter}/{filesDropBox?.files?.length}
            </span>
          )}
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <FacebookCircularProgress />
          <br />
          {firstId === "drive" && (
            <BorderLinearProgress
              variant="determinate"
              value={(counter / filesDrives?.files?.length) * 100}
            />
          )}
          {firstId === "dropbox" && (
            <BorderLinearProgress
              variant="determinate"
              value={(counter / filesDropBox?.files?.length) * 100}
            />
          )}
        </Box>

        {firstId === "dropbox" && (
          <a href="file:///Users/ghassenyakoubi/Desktop/backup-app/backup-app/backend/DropBoxHistory.txt">
            <div className="wrapper-image-text-generate-log">
              <img src={generate} alt="" className="image-generate-log"></img>
              <span className="text-generate-log">Generate log</span>
            </div>
          </a>
        )}
        {firstId === "drive" && (
          <a href="file:///Users/ghassenyakoubi/Desktop/backup-app/backup-app/backend/DriveHistory.txt">
            <div className="wrapper-image-text-generate-log">
              <img src={generate} alt="" className="image-generate-log"></img>
              <span className="text-generate-log">Generate log</span>
            </div>
          </a>
        )}

        <div className="wrapper-image-text-delete-source">
          {firstId === "drive" && (
            <Checkbox
              className="image-delete-source"
              disabled={
                counter / filesDrives?.files.length !== 1 ? true : false
              }
              onClick={() => {
                dispatch(deletefilesdrive(name));
              }}
            ></Checkbox>
          )}
          {firstId === "dropbox" && (
            <Checkbox
              className="image-delete-source"
              disabled={
                counter / filesDropBox?.files.length !== 1 ? true : false
              }
              onClick={() => {
                dispatch(deletefilesdropbox(nameconfig));
              }}
            ></Checkbox>
          )}
          <span className="text-delete-source">Delete source</span>
        </div>
      </Card>
    </>
  );
}
