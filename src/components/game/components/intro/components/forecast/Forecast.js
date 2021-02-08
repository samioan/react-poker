import React from "react";

import withForecastProps from "./withForecastProps";

import { name, temp, description } from "models/forecast/selectors";

import "./forecast.css";

const Forecast = ({ name, temp, description, showMessage }) => {
  return (
    <div>
      <div className="container-f">
        <img className="city-icon image" />{" "}
        <p className="text-f">{name.toUpperCase()}</p>
        <img className="temp-icon image" />{" "}
        <p className="text-f">
          {~~temp}
          &deg;C
        </p>
        <img className="weather-icon image" />{" "}
        <p className="text-f">{description.toUpperCase()}</p>
      </div>
      <p className="text-f"> {showMessage}</p>
    </div>
  );
};

export { Forecast };
export default withForecastProps(Forecast);
