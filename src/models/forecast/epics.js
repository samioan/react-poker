import { combineEpics, ofType } from "redux-observable";
import { getForecast } from "./actions";
import { effect } from "aa-minimal-core-lib/models/epics";
import { getForecastService } from "services";

const getForecastEpic = (action$) =>
  action$.pipe(
    ofType(getForecast.type),
    effect(getForecastService, getForecast)
  );

// TODO: getForecastSucceededEpic

export default combineEpics(getForecastEpic);

export { getForecastEpic };
