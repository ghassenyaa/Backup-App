import React from "react";
import "./_actionLink.scss";
const WithoutLink = ({ label, icon, className, onClickAction }) => {
  return (
    <div
      className={`action-link${className != null ? ` ${className}` : ""}`}
      onClick={onClickAction || null}
      aria-hidden="true"
    >
      <span>{label}</span>
      {icon && icon}
    </div>
  );
};
export default WithoutLink;
