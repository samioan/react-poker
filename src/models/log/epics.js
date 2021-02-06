import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { uuid } from "uuidv4";

import {
  playerHand,
  aiHand,
  playerBet,
  aiMoney,
  playerMoney,
  pot,
} from "models/game/selectors";
import {
  gameStarted,
  playerFolded,
  betRaised,
  cardReplaced,
  playerWon,
  playerLost,
  playerTied,
  phaseAdvanced,
  playerChecked,
} from "models/game/actions";
import { logger } from "./selectors";
import { addMessage } from "./actions";
import { handCheckToMsg } from "lib/handCheck";

const startGameLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(gameStarted.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "GAME STARTED.",
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
        `${uuid()}.` + "Your bet is " + playerBet(state$.value) + " euros.",
        `${uuid()}.` +
          "You have " +
          handCheckToMsg(playerHand(state$.value)) +
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
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
        `${uuid()}.` + "Your bet is " + playerBet(state$.value) + " euros.",
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
          handCheckToMsg(playerHand(state$.value)) +
          ".",
      ];

      return addMessage(newLogger);
    })
  );
const checkLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerChecked.type),
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
      const newLogger = [
        `${uuid()}.` + "PLAYER WINS.",
        `${uuid()}.` +
          "You had " +
          handCheckToMsg(playerHand(state$.value)) +
          ".",
        `${uuid()}.` +
          "Opponent had " +
          handCheckToMsg(aiHand(state$.value)) +
          ".",
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
        `${uuid()}.` + "Opponent has " + aiMoney(state$.value) + " euros.",
      ];

      return addMessage(newLogger);
    })
  );
const playerLostLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerLost.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "PLAYER LOSES.",
        `${uuid()}.` +
          "You had " +
          handCheckToMsg(playerHand(state$.value)) +
          ".",
        `${uuid()}.` +
          "Opponent had " +
          handCheckToMsg(aiHand(state$.value)) +
          ".",
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
        `${uuid()}.` + "Opponent has " + aiMoney(state$.value) + " euros.",
      ];

      return addMessage(newLogger);
    })
  );
const playerTiedLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerTied.type),
    map(() => {
      const newLogger = [
        `${uuid()}.` + "TIE.",
        `${uuid()}.` +
          "You had " +
          handCheckToMsg(playerHand(state$.value)) +
          ".",
        `${uuid()}.` +
          "Opponent had " +
          handCheckToMsg(aiHand(state$.value)) +
          ".",
        `${uuid()}.` + "You have " + playerMoney(state$.value) + " euros.",
        `${uuid()}.` + "Opponent has " + aiMoney(state$.value) + " euros.",
      ];

      return addMessage(newLogger);
    })
  );
const nextPhaseLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(phaseAdvanced.type),
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
  checkLogEpic,
  nextPhaseLogEpic,
  playerWonLogEpic,
  playerLostLogEpic,
  playerTiedLogEpic
);

export {
  startGameLogEpic,
  foldLogEpic,
  raiseLogEpic,
  replaceLogEpic,
  checkLogEpic,
  nextPhaseLogEpic,
  playerWonLogEpic,
  playerLostLogEpic,
  playerTiedLogEpic,
};
