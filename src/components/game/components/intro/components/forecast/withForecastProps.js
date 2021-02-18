import React, { useEffect } from "react";
import { compose } from "redux";
import { withModelProps } from "aa-minimal-core-lib/components/model-props";
import { getForecast } from "models/forecast/actions";
import { name, temp, description } from "models/forecast/selectors";
import getMessageByTemp from "./utils/getMessageByTemp";
import "./forecast.css";

const withForecastProps = (Component) => (props) => {
  const { temp, getForecastOnLoad } = props;
  useEffect(() => {
    getForecastOnLoad();
  });
  const newProps = {
    ...props,
    showMessage: getMessageByTemp(temp),
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
