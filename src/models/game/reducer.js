import {
  playerWon,
  playerLost,
  playerTied,
  cardReplaced,
  startGame,
  fold,
  raise,
  advancePhase,
  betsReset,
} from "./actions";

import { PHASES } from "reference-data";

import deckCreator from "lib/deckCreator";

const initialState = {
  deck: [],
  playerHand: [],
  changedPlayerHand: [],
  aiHand: [],
  playerMoney: 1000,
  aiMoney: 1000,
  playerBet: 0,
  aiBet: 0,
  phase: PHASES.GAME_NOT_STARTED,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case startGame.type: {
      return {
        ...state,
        deck: deckCreator().slice(10, deckCreator().length),
        playerHand: deckCreator().slice(0, 5),
        aiHand: deckCreator().slice(5, 10),
        changedPlayerHand: Array(5).fill(null),
        playerBet: 100,
        aiBet: 100,
        playerMoney: state.playerMoney - 100,
        aiMoney: state.aiMoney - 100,
        phase: PHASES.GAME_STARTED,
      };
    }
    case fold.type: {
      return {
        ...state,
        phase: PHASES.GAME_ENDED,
        aiMoney: state.aiMoney + (state.playerBet + state.aiBet),
        playerBet: 0,
        aiBet: 0,
      };
    }
    case raise.type: {
      return {
        ...state,
        playerMoney: state.playerMoney - 100,
        aiMoney: state.aiMoney - 100,
        playerBet: state.playerBet + 100,
        aiBet: state.aiBet + 100,
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
