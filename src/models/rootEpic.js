import { combineEpics } from "redux-observable";
import gameEpics from "./game/epics";
import logEpics from "./log/epics";
import { epics as effectEpic } from "aa-minimal-core-lib/models/epics";
import forecastEpics from "./forecast/epics";

const rootEpic = combineEpics(gameEpics, logEpics, forecastEpics, effectEpic);

export default rootEpic;
