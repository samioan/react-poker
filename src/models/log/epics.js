import { filter, map, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { uuid } from "uuidv4";

import {
  playerHand,
  aiHand,
  playerBet,
  playerMoney,
  pot,
  phase,
} from "models/game/selectors";
import {
  gameStarted,
  playerFolded,
  betRaised,
  cardReplaced,
  playerWon,
  playerLost,
  playerTied,
  advancePhase,
  check,
} from "models/game/actions";

import {
  addMessage,
  addGameEndMessage,
  addPlayerMoneyMessage,
} from "./actions";
import { handCheck } from "lib/handCheck";

const gameEndLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(check.type),
    filter(() => phase(state$.value) === 4),
    map(() => {
      const newLogger = [
        `${uuid()}.` +
          "You had " +
          handCheck(playerHand(state$.value))[1] +
          ".",
        `${uuid()}.` +
          "Opponent had " +
          handCheck(aiHand(state$.value))[1] +
          ".",
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
      ];

      return addGameEndMessage(newLogger);
    })
  );

const playerMoneyLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(gameStarted.type, betRaised.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
        `${uuid()}.` + "Your bet is " + playerBet(state$.value) + " euros.",
      ];

      return addPlayerMoneyMessage(newLogger);
    })
  );

const startGameLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(gameStarted.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "GAME STARTED.",
        `${uuid()}.` +
          "You have " +
          handCheck(playerHand(state$.value))[1] +
          ".",
      ];

      return addMessage(newLogger);
    })
  );

const foldLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerFolded.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "PLAYER FOLDS.",
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
      ];

      return addMessage(newLogger);
    })
  );

const raiseLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(betRaised.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "PLAYER RAISES.",
        `${uuid()}.` + "Pot is " + pot(state$.value) + " euros.",
      ];

      return addMessage(newLogger);
    })
  );

const replaceLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(cardReplaced.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "PLAYER TRADES A CARD.",
        `${uuid()}.` +
          "You now have " +
          handCheck(playerHand(state$.value))[1] +
          ".",
      ];

      return addMessage(newLogger);
    })
  );
const phase1CheckLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(advancePhase.type),
    filter(() => phase(state$.value) === 2),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "PLAYER CHECKS.",
        `${uuid()}.` + "You can now replace up to 3 cards.",
      ];

      return addMessage(newLogger);
    })
  );
const playerWonLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerWon.type),
    map(() => {
      const newLogger = [`${uuid()}.` + "PLAYER WINS."];

      return addMessage(newLogger);
    })
  );
const playerLostLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerLost.type),
    map(() => {
      const newLogger = [`${uuid()}.` + "PLAYER LOSES."];

      return addMessage(newLogger);
    })
  );
const playerTiedLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerTied.type),
    map(() => {
      const newLogger = [`${uuid()}.` + "TIE."];

      return addMessage(newLogger);
    })
  );
const nextPhaseLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(advancePhase.type),
    filter(() => phase(state$.value) === 3),
    map(() => {
      const newLogger = [`${uuid()}.` + "NEXT TURN."];

      return addMessage(newLogger);
    })
  );
export default combineEpics(
  startGameLogEpic,
  foldLogEpic,
  raiseLogEpic,
  replaceLogEpic,
  phase1CheckLogEpic,
  nextPhaseLogEpic,
  playerWonLogEpic,
  playerLostLogEpic,
  playerTiedLogEpic,
  gameEndLogEpic,
  playerMoneyLogEpic
);

export {
  startGameLogEpic,
  foldLogEpic,
  raiseLogEpic,
  replaceLogEpic,
  phase1CheckLogEpic,
  nextPhaseLogEpic,
  playerWonLogEpic,
  playerLostLogEpic,
  playerTiedLogEpic,
  gameEndLogEpic,
  playerMoneyLogEpic,
};
