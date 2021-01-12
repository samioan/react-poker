import React, { useState } from "react";

const Conditions = (props) => {
  return (
    <div className="buttons-row">
      {props.responseObj.cod === 200 ? (
        <div className="buttons-row">
          <p className="textArea">
            Here in {props.responseObj.name} it is currently{" "}
            {Math.round(props.responseObj.main.temp)} degrees out with{" "}
            {props.responseObj.weather[0].description}.
          </p>
          {Math.round(props.responseObj.main.temp) <= 16 ? (
            <div className="buttons-row">
              <p className="textArea">
                Grab some hot chocolate and play Poker because it's cold
                outside!
              </p>
            </div>
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
    <div className="container2">
      <div className="buttons-row">
        <button className="button" onClick={getForecast}>
          What's the weather like?
        </button>
      </div>
      <div className="buttons-row">
        <Conditions responseObj={responseObj} />
      </div>
    </div>
  );
};
export default Forecast;
