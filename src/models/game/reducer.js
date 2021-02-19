import {
  playerWon,
  playerLost,
  playerTied,
  cardReplaced,
  gameStarted,
  playerFolded,
  betRaised,
  advancePhase,
  deckCreated,
  cardsDealt,
  betsPlaced,
  betsReset,
} from "./actions";

const initialState = {
  deck: [],
  playerHand: [],
  changedPlayerHand: [],
  aiHand: [],
  playerMoney: 1000,
  aiMoney: 1000,
  playerBet: 0,
  aiBet: 0,
  phase: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case gameStarted.type: {
      return {
        ...state,
        phase: 1,
      };
    }
    case deckCreated.type: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case cardsDealt.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case betsPlaced.type: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case playerFolded.type: {
      return {
        ...state,
        phase: 4,
        aiMoney: state.aiMoney + (state.playerBet + state.aiBet),
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
    case playerWon.type: {
      return {
        ...state,
        playerMoney: state.playerMoney + (state.playerBet + state.aiBet),
      };
    }
    case playerLost.type: {
      return {
        ...state,
        aiMoney: state.aiMoney + (state.playerBet + state.aiBet),
      };
    }
    case playerTied.type: {
      return {
        ...state,
        playerMoney: state.playerMoney + state.playerBet,
        aiMoney: state.aiMoney + state.aiBet,
      };
    }
    case advancePhase.type: {
      return {
        ...state,
        phase: state.phase + 1,
      };
    }

    case betsReset.type: {
      return {
        ...state,
        playerBet: 0,
        aiBet: 0,
      };
    }
    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
