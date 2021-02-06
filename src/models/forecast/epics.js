import { combineEpics, ofType } from "redux-observable";
import { forecastLoaded, getForecast } from "./actions";
import { effect } from "aa-minimal-core-lib/models/epics";
import { getForecastService } from "services";
import { temp, name, description } from "./selectors";
import { map } from "rxjs/operators";

const getForecastEpic = (action$) =>
  action$.pipe(
    ofType(getForecast.type),
    effect(getForecastService, getForecast)
  );

// TODO: getForecastSucceededEpic
const getForecastSucceededEpic = (action$) =>
  action$.pipe(
    ofType("//FORECAST/GET_FORECAST_SUCCEEDED"),
    map(({ payload }) => {
      return forecastLoaded({
        name: payload.name,
        temp: payload.main.temp,
        description: payload.weather[0].description,
      });
    })
  );

export default combineEpics(getForecastEpic, getForecastSucceededEpic);

export { getForecastEpic };
