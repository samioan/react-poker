const { combineReducers } = require("redux");
const { default: gameReducer } = require("./game/reducer");
const { default: logReducer } = require("./log/reducer");
const { default: forecastReducer } = require("./forecast/reducer");

const rootReducer = combineReducers({
  game: gameReducer,
  log: logReducer,
  forecast: forecastReducer,
});

export default rootReducer;
