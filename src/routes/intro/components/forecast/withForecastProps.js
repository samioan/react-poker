import React, { useEffect } from "react";
import { compose } from "redux";

import { withModelProps } from "aa-minimal-core-lib/components/model-props";

import { getForecast, city, temperature, weather } from "models/forecast";

import getMessageByTemp from "./utils/getMessageByTemp";
import { cityIcon, tempIcon, weatherIcon } from "./images";

const withForecastProps = (Component) => (props) => {
  const { city, temperature, weather, getForecastOnLoad } = props;

  useEffect(() => {
    getForecastOnLoad();
  }, []);

  const forecastItems = [
    {
      key: "city",
      icon: cityIcon,
      label: city.toUpperCase(),
    },
    {
      key: "temp",
      icon: tempIcon,
      label: <>{~~temperature}&deg;C</>,
    },
    {
      key: "weather",
      icon: weatherIcon,
      label: weather.toUpperCase(),
    },
  ];

  const forecastMessage = getMessageByTemp(temperature);

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
    city,
    temperature,
    weather,
    getForecastOnLoad: getForecast,
  }),
  withForecastProps
);
