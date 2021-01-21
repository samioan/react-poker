import React from "react";

const Log = ({ list = [] }) => (
  <div className="Log-List">
    {list.map((log) => (
      <p className="logText">{log}</p>
    ))}
  </div>
);
export default Log;
