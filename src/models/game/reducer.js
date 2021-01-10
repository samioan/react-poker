import { check, fold, raise, replace, startGame } from "./actions";
import deckCreator from "lib/deckCreator";
import handCheck from "lib/handCheck";

const initialState = {
  deck: [],
  playerHand: [],
  aiHand: [],
  playerMoney: 1000,
  aiMoney: 1000,
  playerBet: 0,
  aiBet: 0,
  phase: 0,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case startGame.type: {
      const newDeck = state.deck.slice();
      const newPlayerHand = state.playerHand.slice();
      const newAiHand = state.aiHand.slice();

      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const bet = 100;

      const newPhase = state.phase;

      newDeck.push(deckCreator());
      const newDeckFlat = newDeck.flat();

      const newerPlayerHand = newPlayerHand.concat(newDeckFlat);
      const newerAiHand = newAiHand.concat(newDeckFlat);

      if (newPhase === 0) {
        newerPlayerHand.splice(0, 1);
        newerPlayerHand.splice(5);
        newerAiHand.splice(0, 6);
        newerAiHand.splice(5);
        newDeckFlat.splice(0, 10);
        return {
          ...state,
          deck: newDeckFlat,
          playerHand: newerPlayerHand,
          aiHand: newerAiHand,
          playerBet: newPlayerBet + bet,
          aiBet: newAiBet + bet,
          phase: newPhase + 2,
        };
      } else {
        return { ...state, phase: newPhase + 1 };
      }
    }

    case fold.type:
      {
        const newPlayerMoney = state.playerMoney;
        const newAiMoney = state.aiMoney;
        const newPlayerBet = state.playerBet;
        const newAiBet = state.aiBet;

        if (state.playerHand.length === 5) {
          return {
            ...state,
            playerMoney: newPlayerMoney - newPlayerBet,
            aiMoney: newAiMoney + (newAiBet + newPlayerBet),
          };
        }
      }
      break;
    case raise.type: {
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const bet = 100;

      return {
        ...state,
        playerBet: newPlayerBet + bet,
        aiBet: newAiBet + bet,
      };
    }
    case replace.type: {
      const cardReplacer = (handIndex) => {
        const newPlayerHand = state.playerHand.slice();
        const newDeck = state.deck.slice();
        const newPhase = state.phase;

        newPlayerHand.splice(handIndex, 1, newDeck[0]);
        newDeck.splice(0, 1);

        if (newDeck.length > 39) {
          return {
            ...state,
            deck: newDeck,
            playerHand: newPlayerHand,
            phase: newPhase + 0.5,
          };
        }
      };
      return cardReplacer();
    }
    case check.type:
      {
        const newPlayerMoney = state.playerMoney;
        const newAiMoney = state.aiMoney;
        const newPlayerBet = state.playerBet;
        const newAiBet = state.aiBet;

        if (state.playerHand.length === 5) {
          if (handCheck(state.playerHand) > handCheck(state.aiHand)) {
            return {
              ...state,
              playerMoney: newPlayerMoney + (newPlayerBet + newAiBet),
              aiMoney: newAiMoney - newAiBet,
            };
          } else if (handCheck(state.playerHand) === handCheck(state.aiHand)) {
            return {
              ...state,
              playerMoney: newPlayerMoney + newPlayerBet,
              aiMoney: newAiMoney + newAiBet,
            };
          } else {
            return {
              ...state,
              playerMoney: newPlayerMoney - newPlayerBet,
              aiMoney: newAiMoney + (newPlayerBet + newAiBet),
            };
          }
        }
      }
      break;
    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
