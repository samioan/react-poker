import React from "react";
import { compose } from "redux";
import { withModelProps } from "aa-minimal-core-lib/components/model-props";

import { startGame } from "models/game";

const withIntroProps = (Component) => (props) => {
  const { startGame } = props;

  const newProps = {
    ...props,
    startGame,
  };

  return <Component {...newProps} />;
};

export { withIntroProps };
export default compose(
  withModelProps({
    startGame,
  }),
  withIntroProps
);
