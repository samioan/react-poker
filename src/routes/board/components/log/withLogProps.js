import React, { useRef, useEffect } from "react";

const withLogProps = (Component) => (props) => {
  const { list } = props;

  const id = (string) => string.split(".")[0];

  const logText = (string) => string.split(".")[1];

  const logRef = useRef(null);

  useEffect(() => {
    logRef.current.scroll({
      top: logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [list]);

  const newProps = { ...props, id, logText, logRef };

  return <Component {...newProps} />;
};

export { withLogProps };
export default withLogProps;
