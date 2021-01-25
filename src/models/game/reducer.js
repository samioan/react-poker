import { check, fold, raise, replace, startGame, nextPhase } from "./actions";
import deckCreator from "lib/deckCreator";
import handCheck from "lib/handCheck";

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
    case startGame.type: {
      const newDeck = state.deck.slice();
      const newPlayerHand = state.playerHand.slice();
      const newAiHand = state.aiHand.slice();

      const bet = 100;
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const newPot = state.pot;

      const newAiMoney = state.aiMoney;
      const newPlayerMoney = state.playerMoney;

      const newPhase = 1;

      newDeck.push(deckCreator());
      const newDeckFlat = newDeck.flat();

      const newerPlayerHand = newPlayerHand.concat(newDeckFlat);
      const newerAiHand = newAiHand.concat(newDeckFlat);

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
        changedPlayerHand: Array(5).fill(null),
        playerBet: newPlayerBet + bet,
        aiBet: newAiBet + bet,
        pot: newPot + bet * 2,
        playerMoney: newPlayerMoney - bet,
        aiMoney: newAiMoney - bet,
        phase: newPhase,
      };
    }

    case fold.type: {
      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPlayerBet = state.playerBet;
      const newPhase = 4;

      alert("Given up!");
      return {
        ...state,

        playerBet: 0,
        aiBet: 0,
        phase: newPhase,
        pot: 0,
        playerMoney: newPlayerMoney - newPlayerBet,
        aiMoney: newAiMoney + newPlayerBet,
      };
    }

    case raise.type: {
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const bet = 100;

      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPot = state.pot;

      if (newPlayerMoney > 0) {
        return {
          ...state,
          playerMoney: newPlayerMoney - bet,
          aiMoney: newAiMoney - bet,
          pot: newPot + bet * 2,
          playerBet: newPlayerBet + bet,
          aiBet: newAiBet + bet,
        };
      } else if (newPlayerMoney <= 0) {
        alert("You cannot bet anymore!");
        return {
          ...state,
        };
      }
      break;
    }

    case replace.type: {
      const newPlayerHand = state.playerHand.slice();
      const newDeck = state.deck.slice();
      const newChangedPlayerHand = state.changedPlayerHand.slice();
      const drawnCardIndex = newPlayerHand.indexOf(action.payload);

      if (newChangedPlayerHand[drawnCardIndex] === null) {
        newChangedPlayerHand.splice(drawnCardIndex, 1, newDeck[0]);
        newPlayerHand.splice(
          drawnCardIndex,
          1,
          newChangedPlayerHand[drawnCardIndex]
        );
        newDeck.splice(0, 1);
      }
      return {
        ...state,
        deck: newDeck,
        playerHand: newPlayerHand,
        changedPlayerHand: newChangedPlayerHand,
      };
    }

    case check.type: {
      const newPlayerMoney = state.playerMoney;
      const newAiMoney = state.aiMoney;
      const newPlayerBet = state.playerBet;
      const newAiBet = state.aiBet;
      const newPot = state.pot;
      const newPhase = 4;

      if (handCheck(state.playerHand) > handCheck(state.aiHand)) {
        alert("You win!");
        return {
          ...state,
          playerBet: 0,
          aiBet: 0,
          phase: newPhase,
          pot: 0,
          playerMoney: newPlayerMoney + newPot,
          aiMoney: newAiMoney - newAiBet,
        };
      } else if (handCheck(state.playerHand) === handCheck(state.aiHand)) {
        alert("Tie!");
        return {
          ...state,
          playerBet: 0,
          aiBet: 0,
          phase: newPhase,
          pot: 0,
          playerMoney: newPlayerMoney + newPlayerBet,
          aiMoney: newAiMoney + newAiBet,
        };
      } else {
        alert("You lose!");
        return {
          ...state,
          playerBet: 0,
          aiBet: 0,
          phase: newPhase,
          pot: 0,
          playerMoney: newPlayerMoney - newPlayerBet,
          aiMoney: newAiMoney + newPot,
        };
      }
    }
    case nextPhase.type: {
      const newPhase = state.phase;

      if (newPhase === 1) {
        alert("You can now replace up to 3 cards.");
      }
      return {
        ...state,
        phase: newPhase + 1,
      };
    }

    default:
      return state;
  }
};

export { initialState };
export default gameReducer;
