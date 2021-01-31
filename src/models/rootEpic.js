import { combineEpics } from "redux-observable";
import gameEpics from "./game/epics";

const rootEpic = combineEpics(gameEpics);

export default rootEpic;
