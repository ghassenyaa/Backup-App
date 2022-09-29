import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const GuestGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
