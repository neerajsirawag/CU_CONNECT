import React from "react";
import "./index.scss";

export default function Loader() {
  return (
    <div className="loader">
      <p>Loading... Please wait...</p>
      <div className="dots">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

