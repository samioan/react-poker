import React, { useEffect } from "react";
import { compose } from "redux";
import { withModelProps } from "aa-minimal-core-lib/components/model-props";
import { getForecast } from "models/forecast/actions";
import { name, temp, description } from "models/forecast/selectors";

import "./forecast.css";

const withForecastProps = (Component) => (props) => {
  const { name, temp, description, getForecastOnLoad } = props;
  useEffect(() => {
    getForecastOnLoad();
  });
  const newProps = {
    ...props,
    showMessage:
      temp <= 10
        ? "A freezing cold day!"
        : temp <= 15
        ? "A cold day!"
        : temp <= 25
        ? "A nice day for poker!"
        : temp <= 30
        ? "A warm day!"
        : temp >= 35
        ? "A pretty hot day!"
        : "Have a good day!",
  };
  return <Component {...newProps} />;
};

export { withForecastProps };
export default compose(
  withModelProps({
    name,
    temp,
    description,
    getForecastOnLoad: getForecast,
  }),
  withForecastProps
);
