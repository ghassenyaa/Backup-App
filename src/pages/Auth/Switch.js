import React, { useEffect } from "react";
import SplashScreen from "../../components/SplashScreen";
import { useLocation, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import axios from "../../utilities/axios";

const Switch = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const { logout } = useAuth();
  const history = useHistory();
  const token = location.search.split("?token=")[1];

  useEffect(() => {
    if (token) {
      logout();
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("token");
      delete axios.defaults.headers.common.Authorization;
      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      if (isAuthenticated) {
        history.push("/index");
      }
      history.go(0);
    } else {
      history.push("/");
    }
  });

  return (
    <div>
      <SplashScreen />
    </div>
  );
};

export default Switch;
