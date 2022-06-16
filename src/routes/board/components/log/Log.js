import React, { useRef, useEffect } from "react";

import "./log.css";
const logSeparation = (str) => {
  return str.split(".");
};
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
          <p className="logText" key={logSeparation(log)[0]}>
            {logSeparation(log)[1]}
          </p>
        ))}
        <div ref={listEndRef} />
      </div>
    </>
  );
};

export default Log;
