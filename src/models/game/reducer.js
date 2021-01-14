import { check, fold, raise, replace, startGame } from "./actions";
import deckCreator from "lib/deckCreator";
import handCheck from "lib/handCheck";

const initialState = {
  deck: [],
  playerHand: [],
  selectedPlayerHand: [],
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
          phase: newPhase + 1,
        };
      }
      break;
    }

    case fold.type: {
      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;

      alert("Given up!");
      return {
        ...state,
        deck: [],
        playerHand: [],
        aiHand: [],
        playerBet: 0,
        aiBet: 0,
        phase: 0,
        playerMoney: newPlayerMoney - newPlayerBet,
        aiMoney: newAiMoney + (newAiBet + newPlayerBet),
      };
    }

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
      const newPlayerHand = state.playerHand.slice();
      const newDeck = state.deck.slice();
      //const newPhase = state.phase;
      newPlayerHand.splice(2, 1, newDeck[0]);
      newDeck.splice(0, 1);

      return {
        ...state,
        deck: newDeck,
        playerHand: newPlayerHand,
        //phase: newPhase + 0.5,
      };
    }
    case check.type: {
      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;

      if (handCheck(state.playerHand) > handCheck(state.aiHand)) {
        alert("You win!");
        return {
          ...state,
          deck: [],
          playerHand: [],
          aiHand: [],
          playerBet: 0,
          aiBet: 0,
          phase: 0,
          playerMoney: newPlayerMoney + (newPlayerBet + newAiBet),
          aiMoney: newAiMoney - newAiBet,
        };
      } else if (handCheck(state.playerHand) === handCheck(state.aiHand)) {
        alert("Tie!");
        return {
          ...state,
          deck: [],
          playerHand: [],
          aiHand: [],
          playerBet: 0,
          aiBet: 0,
          phase: 0,
          playerMoney: newPlayerMoney + newPlayerBet,
          aiMoney: newAiMoney + newAiBet,
        };
      } else {
        alert("You lose!");
        return {
          ...state,
          deck: [],
          playerHand: [],
          aiHand: [],
          playerBet: 0,
          aiBet: 0,
          phase: 0,
          playerMoney: newPlayerMoney - newPlayerBet,
          aiMoney: newAiMoney + (newPlayerBet + newAiBet),
        };
      }
    }
    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
