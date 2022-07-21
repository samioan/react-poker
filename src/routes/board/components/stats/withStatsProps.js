import React from "react";

const withStatsProps = (Component) => (props) => {
  const isAmountValid = (amount) => amount >= 0;

  const newProps = {
    ...props,
    isAmountValid,
  };

  return <Component {...newProps} />;
};

export { withStatsProps };
export default withStatsProps;
