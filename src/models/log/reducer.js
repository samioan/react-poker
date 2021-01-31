import {
  gameWin,
  gameLose,
  gameTie,
  gameChecked,
  cardReplaced,
  gameStarted,
  gameFolded,
  betRaised,
  phaseAdvanced,
  betNotRaised,
} from "models/game/actions";

import { handCheckToMsg } from "lib/handCheck";

const initialState = {
  logger: [],
};

const logReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameStarted.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Game started.");
      newLogger.push("You have " + action.payload.playerMoney + " euros.");
      newLogger.push("Your bet is " + action.payload.playerBet + " euros.");
      newLogger.push(
        "You have " + handCheckToMsg(action.payload.playerHand) + "."
      );
      return {
        logger: newLogger,
      };
    }

    case gameFolded.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player folds.");
      newLogger.push("You have " + action.payload.playerMoney + " euros.");
      return {
        logger: newLogger,
      };
    }

    case betRaised.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player raises.");
      newLogger.push("You have " + action.payload.playerMoney + " euros.");
      newLogger.push("Your bet is " + action.payload.playerBet + " euros.");
      return {
        logger: newLogger,
      };
    }
    case betNotRaised.type: {
      const newLogger = state.logger.slice();
      newLogger.push("You cannot bet anymore.");
      return {
        logger: newLogger,
      };
    }

    case cardReplaced.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player trades a card.");
      newLogger.push(
        "You now have " + handCheckToMsg(action.payload.playerHand) + "."
      );
      return {
        logger: newLogger,
      };
    }

    case gameChecked.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player checks.");
      newLogger.push("You can now replace up to 3 cards.");

      return {
        logger: newLogger,
      };
    }
    case gameWin.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player wins.");
      newLogger.push(
        "You had " + handCheckToMsg(action.payload.playerHand) + "."
      );
      newLogger.push(
        "Opponent had " + handCheckToMsg(action.payload.aiHand) + "."
      );
      newLogger.push("You have " + action.payload.playerMoney + " euros.");
      newLogger.push("Opponent has " + action.payload.aiMoney + " euros.");
      return {
        logger: newLogger,
      };
    }
    case gameLose.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Player loses.");
      newLogger.push(
        "You had " + handCheckToMsg(action.payload.playerHand) + "."
      );
      newLogger.push(
        "Opponent had " + handCheckToMsg(action.payload.aiHand) + "."
      );
      newLogger.push("You have " + action.payload.playerMoney + " euros.");
      newLogger.push("Opponent has " + action.payload.aiMoney + " euros.");

      return {
        logger: newLogger,
      };
    }
    case gameTie.type: {
      const newLogger = state.logger.slice();
      newLogger.push("Tie.");
      newLogger.push(
        "You had " + handCheckToMsg(action.payload.playerHand) + "."
      );
      newLogger.push(
        "Opponent had " + handCheckToMsg(action.payload.aiHand) + "."
      );
      newLogger.push("You have " + action.payload.playerMoney + " euros.");
      newLogger.push("Opponent has " + action.payload.aiMoney + " euros.");

      return {
        logger: newLogger,
      };
    }
    case phaseAdvanced.type: {
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
export default logReducer;
