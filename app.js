const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");

const userRoutes = require("./routes/userRouter");
const backupsRouter = require("./routes/backupsRouter");
const driveMethode = require("./routes/driveMethode");
const DropBoxRouter = require("./routes/dropBoxRouter");

app.use(cors());

app.use(express.json());
//express middlewares
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/users", userRoutes);
app.use("/backups", backupsRouter);
app.use("/drive", driveMethode);
app.use("/dropbox", DropBoxRouter);

module.exports = app;
