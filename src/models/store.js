import { initialState as gameInitialState } from "./game/reducer";

import rootReducer from "./rootReducer";
import { createStore } from "redux";

const store = createStore(rootReducer, { game: gameInitialState });

export default store;
