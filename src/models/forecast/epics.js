import { map } from "rxjs/operators";
import { getForecastService } from "./services";
import { combineEpics, ofType } from "redux-observable";
import { effect } from "aa-minimal-core-lib/models/epics";

import { forecastLoaded, getForecast } from "./actions";

const getForecastEpic = (action$) =>
  action$.pipe(
    ofType(getForecast.type),
    effect(getForecastService, getForecast)
  );

const getForecastSucceededEpic = (action$) =>
  action$.pipe(
    ofType(getForecast.succeeded.type),
    map(({ payload }) => {
      return forecastLoaded({
        name: payload?.name,
        temp: payload?.main?.temp,
        description: payload?.weather[0]?.description,
      });
    })
  );

export default combineEpics(getForecastEpic, getForecastSucceededEpic);

export { getForecastEpic, getForecastSucceededEpic };
