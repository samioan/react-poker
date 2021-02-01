import { combineEpics } from "redux-observable";
import gameEpics from "./game/epics";
import logEpics from "./log/epics";

const rootEpic = combineEpics(gameEpics, logEpics);

export default rootEpic;
