import {
  checkLog,
  foldLog,
  raiseLog,
  replaceLog,
  startGameLog,
} from "./actions";

const initialState = {
  logger: [],
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case startGameLog.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Game started!");

      return {
        ...state,
        logger: newLogger,
      };
    }

    case foldLog.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player has folded!");

      return {
        ...state,
        logger: newLogger,
      };
    }

    case raiseLog.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player has raised their bid!");

      return {
        ...state,
        logger: newLogger,
      };
    }

    case replaceLog.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player has traded a card!");

      return {
        ...state,
        logger: newLogger,
      };
    }

    case checkLog.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player has checked!");

      return {
        ...state,
        logger: newLogger,
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default logReducer;
