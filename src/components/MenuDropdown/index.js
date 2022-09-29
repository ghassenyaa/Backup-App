import React, { useRef, useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/core/styles";
import "./_menuDropdown.scss";
import { fetchUser } from "../../slices/user";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import WithoutLink from "./../ActionLink/WithoutLink";
import useAuth from "../../hooks/useAuth";
import avatar from "../../assets/img/avatar.webp";
const useStyles = makeStyles((theme) => ({
  dropdown: {
    marginLeft: "8px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}));
const MenuDropdown = () => {
  const { logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    setOpen(false);
  };
  function handleListKeyDown(event) {
    event.preventDefault();
    setOpen(false);
  }
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);
  const handleLogout = async () => {
    try {
      await logout();
      dispatch({ type: "LOGOUT" });
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${classes.dropdown} menu-dropdown`}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar alt={user.name} src={avatar} id="img-preview" />
        <div className={`texts ${classes.sectionDesktop}`}>
          <span className="title"> {user.name}</span>
        </div>
        <div className="icon-holder">
          <KeyboardArrowDownIcon />
        </div>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
              marginTop: "12px",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    to="#"
                    onClick={() => handleLogout()}
                    component={Link}
                  >
                    <WithoutLink
                      label="Logout "
                      icon={<ExitToAppIcon />}
                      className="text-muted full-width"
                    />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
export default MenuDropdown;
