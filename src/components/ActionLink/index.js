import React from "react";
import { Link } from "react-router-dom";
import "./_actionLink.scss";
const ActionLink = ({ label, icon, className, url, onClickAction }) => {
  return (
    <Link
      to={url || "#"}
      className={`action-link ${className != null ? ` ${className}` : ""}`}
      onClick={onClickAction || null}
    >
      <span>{label}</span>
      <img
        src={icon}
        style={{ marginRight: "17px" }}
        alt={icon}
        className={`${
          icon == "/static/media/ArrowDown.e0500c16.svg" ? "isArrowDown" : ""
        }`}
      />
      {/* {icon && icon} */}
    </Link>
  );
};

export default ActionLink;
