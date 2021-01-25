import React from "react";
import "./log.css";

const Log = ({ list = [] }) => (
  <div className="Log-List">
    {list.map((log) => (
      <p className="logText">{log}</p>
    ))}
  </div>
);
export default Log;
