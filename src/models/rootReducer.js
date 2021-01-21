const { combineReducers } = require("redux");
const { default: gameReducer } = require("./game/reducer");
const { default: logReducer } = require("./log/reducer");

const rootReducer = combineReducers({
  game: gameReducer,
  log: logReducer,
});

export default rootReducer;
