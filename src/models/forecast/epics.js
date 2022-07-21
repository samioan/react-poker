import { getForecastService } from "./services";
import { combineEpics, ofType } from "redux-observable";
import { effect } from "aa-minimal-core-lib/models/epics";

import { getForecast } from "./actions";

const getForecastEpic = (action$) =>
  action$.pipe(
    ofType(getForecast.type),
    effect(getForecastService, getForecast)
  );

export default combineEpics(getForecastEpic);

export { getForecastEpic };
