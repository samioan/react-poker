import React from "react";

import classes from "./Forecast.module.css";
import withForecastProps from "./withForecastProps";

const Forecast = ({ forecastItems, forecastMessage }) => {
  return (
    <div>
      <div className={classes.container}>
        {forecastItems.map(({ key, icon, label }) => (
          <div key={key} className={classes.itemContainer}>
            <img src={icon} className={classes.image} />
            <p className={classes.text}>{label}</p>
          </div>
        ))}
      </div>
      <p className={classes.forecastMessage}>{forecastMessage}</p>
    </div>
  );
};

export { Forecast };
export default withForecastProps(Forecast);
