import { check, fold, raise, replace, startGame, nextPhase } from "./actions";

const initialState = {
  logger: [],
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case startGame.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Game started.");

      return {
        logger: newLogger,
      };
    }

    case fold.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player folds.");

      return {
        logger: newLogger,
      };
    }

    case raise.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player raises.");

      return {
        logger: newLogger,
      };
    }

    case replace.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player trades a card.");

      return {
        logger: newLogger,
      };
    }

    case check.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player checks.");

      return {
        logger: newLogger,
      };
    }
    case nextPhase.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Next turn.");

      return {
        logger: newLogger,
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
