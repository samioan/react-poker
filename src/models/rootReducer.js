const { combineReducers } = require("redux");
const { default: gameReducer } = require("./game/reducer");

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
