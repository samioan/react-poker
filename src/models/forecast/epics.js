import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import { name, temp, description } from "./selectors";
import { getForecast, forecastLoaded } from "./actions";

const forecastEpic = (action$, state$) =>
  action$.pipe(
    ofType(getForecast.type),
    map(() => {
      const newName = name(state$.value);
      const newTemp = temp(state$.value);
      const newDesc = description(state$.value);

      const weatherObj = [];

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
          weatherObj.push(response.name);
          weatherObj.push(response.main.temp);
          weatherObj.push(response.weather[0].description);
        })
        .catch((err) => {
          console.error(err);
        });

      return forecastLoaded({
        name: newName + weatherObj[0],
        temp: newTemp + weatherObj[1],
        description: newDesc + weatherObj[2],
      });
    })
  );

export default combineEpics(forecastEpic);

export { forecastEpic };
