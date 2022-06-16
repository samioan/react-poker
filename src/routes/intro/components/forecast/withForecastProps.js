import React, { useEffect } from "react";
import { compose } from "redux";

import { withModelProps } from "aa-minimal-core-lib/components/model-props";

import { getForecast, name, temp, description } from "models/forecast";

import getMessageByTemp from "./utils/getMessageByTemp";
import { cityIcon, tempIcon, weatherIcon } from "./images";

const withForecastProps = (Component) => (props) => {
  const { name, temp, description, getForecastOnLoad } = props;

  useEffect(() => {
    getForecastOnLoad();
  });

  const forecastItems = [
    {
      key: "city",
      icon: cityIcon,
      label: name.toUpperCase() || "",
    },
    {
      key: "temp",
      icon: tempIcon,
      label: <>{~~temp}&deg;C</> || 0,
    },
    {
      key: "weather",
      icon: weatherIcon,
      label: description.toUpperCase() || "",
    },
  ];

  const forecastMessage = getMessageByTemp(temp);

  const newProps = {
    ...props,
    forecastItems,
    forecastMessage,
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
