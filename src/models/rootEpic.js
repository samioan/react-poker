import { combineEpics } from "redux-observable";
import gameEpics from "./game/epics";
import logEpics from "./log/epics";
import forecastEpics from "./forecast/epics";

const rootEpic = combineEpics(gameEpics, logEpics, forecastEpics);

export default rootEpic;
