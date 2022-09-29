import React, { useState } from "react";
import MenuDropdown from "./../../components/MenuDropdown/index";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
import data from "../../utilities/constants";
import { Card } from "@mui/material";
import "./_index.scss";
import { Link } from "react-router-dom";
import { getId } from "../../slices/form";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
}));
const Index = ({ handleDrawerToggle }) => {
  const classes = useStyles();
  const [name] = useState("");
  const [division] = useState("");
  const { filesDropBox } = useSelector((state) => state.services);

  console.log("filesDropBox", filesDropBox.files);

  const dispatch = useDispatch();

  return (
    <div className="home-wrapper-view">
      <div className="header-wrapper">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <MenuDropdown name={name} division={division} />
      </div>

      <Card className="wrapper-form-backup">
        {data.backup_List.map((el, index) => (
          <React.Fragment key={index}>
            <Card
              className="wrapper-content-backup"
              onClick={() => {
                dispatch(getId(el.id));
              }}
            >
              <Link
                to={{
                  pathname: "/config",
                  state: { ID: el.id },
                }}
              >
                <img
                  src={el.icon}
                  alt={el.id}
                  className="wrapper_image-backup"
                />
                <div className="name-backup">{el.name}</div>
              </Link>
            </Card>
          </React.Fragment>
        ))}
      </Card>
    </div>
  );
};
export default Index;
