import { map } from "rxjs/operators";
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
  gameFolded,
  raise,
  betRaised,
  betNotRaised,
  replace,
  cardReplaced,
  cardNotReplaced,
  check,
  gameWin,
  gameLose,
  gameTie,
  nextPhase,
  phaseAdvanced,
  gameChecked,
} from "./actions";
import deckCreator from "lib/deckCreator";
import handCheck from "lib/handCheck";

const startGameEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(({ payload }) => {
      const newDeck = deck(state$.value).slice();
      const newPlayerHand = playerHand(state$.value).slice();
      const newAiHand = aiHand(state$.value).slice();

      const bet = 100;
      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);
      const newPot = pot(state$.value);

      const newAiMoney = aiMoney(state$.value);
      const newPlayerMoney = playerMoney(state$.value);

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

      return gameStarted({
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
      });
    })
  );

const foldEpic = (action$, state$) =>
  action$.pipe(
    ofType(fold.type),
    map(({ payload }) => {
      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPhase = 4;
      const newPot = pot(state$.value);

      return gameFolded({
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
    map(({ payload }) => {
      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);
      const bet = 100;

      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPot = pot(state$.value);

      if (newPlayerMoney > 0) {
        return betRaised({
          playerMoney: newPlayerMoney - bet,
          aiMoney: newAiMoney - bet,
          pot: newPot + bet * 2,
          playerBet: newPlayerBet + bet,
          aiBet: newAiBet + bet,
        });
      } else if (newPlayerMoney <= 0) {
        return betNotRaised({});
      }
    })
  );

const replaceEpic = (action$, state$) =>
  action$.pipe(
    ofType(replace.type),
    map(({ payload }) => {
      const newPlayerHand = playerHand(state$.value).slice();
      const newDeck = deck(state$.value).slice();
      const newChangedPlayerHand = changedPlayerHand(state$.value).slice();
      const drawnCardIndex = newPlayerHand.indexOf(payload);
      if (newChangedPlayerHand[drawnCardIndex] === null) {
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
      } else return cardNotReplaced({});
    })
  );
const checkEpic = (action$, state$) =>
  action$.pipe(
    ofType(check.type),
    map(({ payload }) => {
      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);
      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);
      const newPot = pot(state$.value);
      const newPhase = phase(state$.value);
      const newPlayerHand = playerHand(state$.value).slice();
      const newAiHand = aiHand(state$.value).slice();

      if (newPhase === 1) {
        return gameChecked({
          phase: newPhase + 1,
        });
      } else if (newPhase !== 1) {
        if (handCheck(newPlayerHand) > handCheck(newAiHand)) {
          return gameWin({
            playerBet: 0,
            aiBet: 0,
            phase: newPhase + 1,
            pot: 0,
            playerMoney: newPlayerMoney + newPot,
            aiMoney: newAiMoney,
            playerHand: newPlayerHand,
            aiHand: newAiHand,
          });
        } else if (handCheck(newPlayerHand) === handCheck(newAiHand)) {
          return gameTie({
            playerBet: 0,
            aiBet: 0,
            phase: newPhase + 1,
            pot: 0,
            playerMoney: newPlayerMoney + newPlayerBet,
            aiMoney: newAiMoney + newAiBet,
            playerHand: newPlayerHand,
            aiHand: newAiHand,
          });
        } else {
          return gameLose({
            playerBet: 0,
            aiBet: 0,
            phase: newPhase + 1,
            pot: 0,
            playerMoney: newPlayerMoney,
            aiMoney: newAiMoney + newPot,
            playerHand: newPlayerHand,
            aiHand: newAiHand,
          });
        }
      }
    })
  );
const nextPhaseEpic = (action$, state$) =>
  action$.pipe(
    ofType(nextPhase.type),
    map(({ payload }) => {
      const newPhase = phase(state$.value);

      return phaseAdvanced({
        phase: newPhase + 1,
      });
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
