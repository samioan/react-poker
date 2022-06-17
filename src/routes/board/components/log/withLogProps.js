import React, { useRef, useEffect } from "react";

const withLogProps = (Component) => (props) => {
  const { list } = props;

  const id = (string) => string.split(".")[0];

  const logText = (string) => string.split(".")[1];

  const listEndRef = useRef(null);

  useEffect(() => {
    listEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [list]);

  const newProps = { ...props, id, logText, listEndRef };

  return <Component {...newProps} />;
};

export { withLogProps };
export default withLogProps;
