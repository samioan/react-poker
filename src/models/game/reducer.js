import {
  gameChecked,
  gameWin,
  gameLose,
  gameTie,
  cardReplaced,
  gameStarted,
  gameFolded,
  betRaised,
  phaseAdvanced,
} from "./actions";

const initialState = {
  deck: [],
  playerHand: [],
  changedPlayerHand: [],
  aiHand: [],
  playerMoney: 1000,
  aiMoney: 1000,
  pot: 0,
  playerBet: 0,
  aiBet: 0,
  phase: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameStarted.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case gameFolded.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case betRaised.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case cardReplaced.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case gameChecked.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case gameWin.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case gameLose.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case gameTie.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case phaseAdvanced.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
