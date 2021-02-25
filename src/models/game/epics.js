import { map, filter, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { cloneDeep } from "lodash";

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
  advancePhase,
  nextTurn,
  deckCreated,
  cardsDealt,
  betsPlaced,
  betsReset,
} from "./actions";
import { deckCreator } from "lib/deckCreator";
import compareHands from "./utils/compareHands";

const createDeckEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() => {
      const originalDeck = deckCreator();

      return deckCreated({
        deck: originalDeck,
      });
    })
  );

const dealCardsEpic = (action$, state$) =>
  action$.pipe(
    ofType(deckCreated.type),
    map(() => {
      const newPlayerHand = deck(state$.value).slice(0, 5);
      const newAiHand = deck(state$.value).slice(5, 10);
      const updatedDeck = deck(state$.value).slice(
        10,
        deck(state$.value).length
      );

      return cardsDealt({
        deck: updatedDeck,
        playerHand: newPlayerHand,
        aiHand: newAiHand,
        changedPlayerHand: Array(5).fill(null),
      });
    })
  );

const placeBetsEpic = (action$, state$) =>
  action$.pipe(
    ofType(cardsDealt.type),
    map(() => {
      const newAiMoney = aiMoney(state$.value);
      const newPlayerMoney = playerMoney(state$.value);

      const OPENING_BET = 100;

      return betsPlaced({
        playerBet: OPENING_BET,
        aiBet: OPENING_BET,
        playerMoney: newPlayerMoney - OPENING_BET,
        aiMoney: newAiMoney - OPENING_BET,
      });
    })
  );

const startGameEpic = (action$, state$) =>
  action$.pipe(ofType(betsPlaced.type), map(gameStarted));

const foldEpic = (action$, state$) =>
  action$.pipe(
    ofType(fold.type),
    mergeMap(() => {
      return [playerFolded(), betsReset()];
    })
  );

const raiseEpic = (action$, state$) =>
  action$.pipe(
    ofType(raise.type),
    filter(() => playerMoney(state$.value) > 0),
    map(() => {
      const STANDARD_BET_RAISE = 100;

      const newPlayerBet = playerBet(state$.value);
      const newAiBet = aiBet(state$.value);

      const newPlayerMoney = playerMoney(state$.value);
      const newAiMoney = aiMoney(state$.value);

      return betRaised({
        playerMoney: newPlayerMoney - STANDARD_BET_RAISE,
        aiMoney: newAiMoney - STANDARD_BET_RAISE,
        playerBet: newPlayerBet + STANDARD_BET_RAISE,
        aiBet: newAiBet + STANDARD_BET_RAISE,
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
      const newPlayerHand = cloneDeep(playerHand(state$.value));
      const newDeck = cloneDeep(deck(state$.value));
      const newChangedPlayerHand = cloneDeep(changedPlayerHand(state$.value));
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

const phase1CheckEpic = (action$, state$) =>
  action$.pipe(
    ofType(check.type),
    filter(() => phase(state$.value) === 1),
    map(advancePhase)
  );

const phase3CheckEpic = (action$, state$) =>
  action$.pipe(
    ofType(check.type),
    filter(() => phase(state$.value) === 3),
    mergeMap(() => {
      const comparisonResult = compareHands(
        playerHand(state$.value),
        aiHand(state$.value)
      );
      const actions = [advancePhase()];

      switch (comparisonResult) {
        case 1:
          actions.push(playerWon(), betsReset());
          break;
        case 2:
          actions.push(playerLost(), betsReset());
          break;
        default:
          actions.push(playerTied(), betsReset());
      }

      return actions;
    })
  );

const nextTurnEpic = (action$, state$) =>
  action$.pipe(ofType(nextTurn.type), map(advancePhase));

export default combineEpics(
  startGameEpic,
  foldEpic,
  raiseEpic,
  replaceEpic,
  phase1CheckEpic,
  phase3CheckEpic,
  nextTurnEpic,
  createDeckEpic,
  dealCardsEpic,
  placeBetsEpic
);

export {
  startGameEpic,
  foldEpic,
  raiseEpic,
  replaceEpic,
  phase1CheckEpic,
  phase3CheckEpic,
  nextTurnEpic,
  createDeckEpic,
  dealCardsEpic,
  placeBetsEpic,
};
