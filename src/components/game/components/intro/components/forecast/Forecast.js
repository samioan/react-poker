import { Button } from "components/game/components/board/components";
import React, { useState } from "react";

import withForecastProps from "./withForecastProps";

//import { name, temp, description } from "models/forecast/selectors";

import "./forecast.css";

//const Forecast = ({ name, temp, description, onClickForecastHandler }) => (
//  <div>
//    <div>
//      <Button id={"Weather Forecast"} onClick={onClickForecastHandler} />
//    </div>
//    <div>
//      <p className="text">{name}</p>
//      <p className="text">{temp}</p>
//      <p className="text">{description}</p>
//    </div>
//  </div>
//);

const Conditions = (props) => {
  return (
    <div className="buttons-row">
      {props.responseObj.cod === 200 ? (
        <div className="buttons-row">
          <p className="text">
            Here in {props.responseObj.name} it is currently{" "}
            {Math.round(props.responseObj.main.temp)} degrees out with{" "}
            {props.responseObj.weather[0].description}.
          </p>
          {Math.round(props.responseObj.main.temp) <= 16 ? (
            <p className="text">
              Grab some hot chocolate and play Poker because it's cold outside!
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const Forecast = () => {
  let [responseObj, setResponseObj] = useState({});

  function getForecast() {
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/weather?q=Athens%2Cgr&units=metric",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "7f268e1e4amsh5918349f7b2b61bp1e32b3jsnf97c9be51f24",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="container-f">
      <div className="buttons-row">
        <Button id={"Today's Weather Forecast"} onClick={getForecast} />
      </div>
      <div className="buttons-row">
        <Conditions responseObj={responseObj} />
      </div>
    </div>
  );
};

export { Forecast };
export default withForecastProps(Forecast);
