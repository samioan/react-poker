import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { name, temp, description } from "./selectors";
import { getForecast, forecastLoaded } from "./actions";
import { effect } from "aa-minimal-core-lib/models/epics";

const forecastEpic = (action$, state$) =>
  action$.pipe(
    ofType(getForecast.type),
    effect(() => {
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
      ).then((response) => response.json());
    }, getForecast)
  );

export default combineEpics(forecastEpic);

export { forecastEpic };
