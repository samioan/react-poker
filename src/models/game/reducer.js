import {
  playerChecked,
  playerWon,
  playerLost,
  playerTied,
  cardReplaced,
  gameStarted,
  playerFolded,
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

    case playerFolded.type: {
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
    case playerChecked.type: {
      return {
        ...state,
        phase: action.payload,
      };
    }
    case playerWon.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case playerLost.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case playerTied.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case phaseAdvanced.type: {
      return {
        ...state,
        phase: action.payload,
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
