import React, { useState } from "react";

const Conditions = (props) => {
  return (
    <div>
      {props.responseObj.cod === 200 ? (
        <div>
          <p>
            Here in {props.responseObj.name} it is currently{" "}
            {Math.round(props.responseObj.main.temp)} degrees out with{" "}
            {props.responseObj.weather[0].description}.
          </p>
          {Math.round(props.responseObj.main.temp) <= 16 ? (
            <div>
              <p>
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
    <div>
      <button className="button" onClick={getForecast}>
        What's the weather like?
      </button>
      <Conditions responseObj={responseObj} />
    </div>
  );
};
export default Forecast;
