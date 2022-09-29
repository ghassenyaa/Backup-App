import React from "react";
import "./_loader.scss";
const Loader = () => {
  return (
    <div className="loader">
      <div className="outer"></div>
      <div className="middle"></div>
      <div className="inner"></div>
    </div>
  );
};

export default Loader;
