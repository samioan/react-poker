import React, { useRef, useEffect } from "react";

import "./log.css";

const Log = ({ list = [] }) => {
  const listEndRef = useRef(null);
  const scrollToBottom = () => {
    listEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [list]);
  return (
    <>
      <div className="Log-List">
        {list.map((log) => (
          <p className="logText">{log}</p>
        ))}
        <div ref={listEndRef} />
      </div>
    </>
  );
};

export default Log;
