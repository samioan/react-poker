import { map, filter } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

import {
  deck,
  playerHand,
  aiHand,
  playerBet,
  aiBet,
  aiMoney,
  playerMoney,
  changedPlayerHand,
  phase,
  pot,
} from "./selectors";
import {
  startGame,
  gameStarted,
  fold,
  playerFolded,
  raise,
  betRaised,
  replace,
  cardReplaced,
  check,
  playerWon,
  playerLost,
  playerTied,
  nextPhase,
  phaseAdvanced,
  playerChecked,
} from "./actions";
import deckCreator from "lib/deckCreator";
import handCheck from "lib/handCheck";

const startGameEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const originalDeck = deckCreator();
      const newPlayerHand = originalDeck.slice(0, 5);
      const newAiHand = originalDeck.slice(5, 10);
      const updatedDeck = originalDeck.slice(10, originalDeck.length);
      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);
      const newPot = pot(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPlayerMoney = playerMoney(state$.value);

      const bet = 100;
      const newPhase = 1;

      return gameStarted({
        deck: updatedDeck,
        playerHand: newPlayerHand,
        aiHand: newAiHand,
        changedPlayerHand: Array(5).fill(null),
        playerBet: newPlayerBet + bet,
        aiBet: newAiBet + bet,
        pot: newPot + bet * 2,
        playerMoney: newPlayerMoney - bet,
        aiMoney: newAiMoney - bet,
        phase: newPhase,
      });
    })
  );

const foldEpic = (action$, state$) =>
  action$.pipe(
    ofType(fold.type),
    map(() => {
      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPhase = 4;
      const newPot = pot(state$.value);

      return playerFolded({
        playerBet: 0,
        aiBet: 0,
        phase: newPhase,
        pot: 0,
        playerMoney: newPlayerMoney,
        aiMoney: newAiMoney + newPot,
      });
    })
  );

const raiseEpic = (action$, state$) =>
  action$.pipe(
    ofType(raise.type),
    filter(() => playerMoney(state$.value) > 0),
    map(() => {
      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);
      const bet = 100;

      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPot = pot(state$.value);

      return betRaised({
        playerMoney: newPlayerMoney - bet,
        aiMoney: newAiMoney - bet,
        pot: newPot + bet * 2,
        playerBet: newPlayerBet + bet,
        aiBet: newAiBet + bet,
      });
    })
  );

const replaceEpic = (action$, state$) =>
  action$.pipe(
    ofType(replace.type),
    filter(
      ({ payload }) =>
        changedPlayerHand(state$.value)[
          playerHand(state$.value).indexOf(payload)
        ] === null
    ),
    map(({ payload }) => {
      const newPlayerHand = playerHand(state$.value).slice();
      const newDeck = deck(state$.value).slice();
      const newChangedPlayerHand = changedPlayerHand(state$.value).slice();
      const drawnCardIndex = newPlayerHand.indexOf(payload);

      newChangedPlayerHand.splice(drawnCardIndex, 1, newDeck[0]);
      newPlayerHand.splice(
        drawnCardIndex,
        1,
        newChangedPlayerHand[drawnCardIndex]
      );
      newDeck.splice(0, 1);
      return cardReplaced({
        deck: newDeck,
        playerHand: newPlayerHand,
        changedPlayerHand: newChangedPlayerHand,
      });
    })
  );
const checkEpic = (action$, state$) =>
  action$.pipe(
    ofType(check.type),
    map(() => {
      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);
      const newPot = pot(state$.value);
      const newPhase = phase(state$.value);
      const newPlayerHand = playerHand(state$.value).slice();
      const newAiHand = aiHand(state$.value).slice();

      const commonPayload = {
        playerBet: 0,
        aiBet: 0,
        phase: newPhase + 1,
        pot: 0,
        playerHand: newPlayerHand,
        aiHand: newAiHand,
      };
      if (newPhase === 1) {
        return playerChecked(newPhase + 1);
      } else if (newPhase !== 1) {
        if (handCheck(newPlayerHand) > handCheck(newAiHand)) {
          return playerWon({
            ...commonPayload,
            playerMoney: newPlayerMoney + newPot,
            aiMoney: newAiMoney,
          });
        } else if (handCheck(newPlayerHand) === handCheck(newAiHand)) {
          return playerTied({
            ...commonPayload,
            playerMoney: newPlayerMoney + newPlayerBet,
            aiMoney: newAiMoney + newAiBet,
          });
        } else {
          return playerLost({
            ...commonPayload,
            playerMoney: newPlayerMoney,
            aiMoney: newAiMoney + newPot,
          });
        }
      }
    })
  );
const nextPhaseEpic = (action$, state$) =>
  action$.pipe(
    ofType(nextPhase.type),
    map(() => {
      const newPhase = phase(state$.value);

      return phaseAdvanced(newPhase + 1);
    })
  );
export default combineEpics(
  startGameEpic,
  foldEpic,
  raiseEpic,
  replaceEpic,
  checkEpic,
  nextPhaseEpic
);

export {
  startGameEpic,
  foldEpic,
  raiseEpic,
  replaceEpic,
  checkEpic,
  nextPhaseEpic,
};
