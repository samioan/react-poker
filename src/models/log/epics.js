import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";

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
        ...logger(state$.value),
        "GAME STARTED.",
        "You have " + playerMoney(state$.value) + " euros.",
        "Your bet is " + playerBet(state$.value) + " euros.",
        "You have " + handCheckToMsg(playerHand(state$.value)) + ".",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );

const foldLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerFolded.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "PLAYER FOLDS.",
        "You have " + playerMoney(state$.value) + " euros.",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );

const raiseLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(betRaised.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "PLAYER RAISES.",
        "You have " + playerMoney(state$.value) + " euros.",
        "Your bet is " + playerBet(state$.value) + " euros.",
        "Pot is " + pot(state$.value) + " euros.",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );

const replaceLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(cardReplaced.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "PLAYER TRADES A CARD.",
        "You now have " + handCheckToMsg(playerHand(state$.value)) + ".",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );
const checkLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerChecked.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "PLAYER CHECKS.",
        "You can now replace up to 3 cards.",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );
const playerWonLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerWon.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "PLAYER WINS.",
        "You had " + handCheckToMsg(playerHand(state$.value)) + ".",
        "Opponent had " + handCheckToMsg(aiHand(state$.value)) + ".",
        "You have " + playerMoney(state$.value) + " euros.",
        "Opponent has " + aiMoney(state$.value) + " euros.",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );
const playerLostLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerLost.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "PLAYER LOSES.",
        "You had " + handCheckToMsg(playerHand(state$.value)) + ".",
        "Opponent had " + handCheckToMsg(aiHand(state$.value)) + ".",
        "You have " + playerMoney(state$.value) + " euros.",
        "Opponent has " + aiMoney(state$.value) + " euros.",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );
const playerTiedLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(playerTied.type),
    map(() => {
      const newLogger = [
        ...logger(state$.value),
        "TIE.",
        "You had " + handCheckToMsg(playerHand(state$.value)) + ".",
        "Opponent had " + handCheckToMsg(aiHand(state$.value)) + ".",
        "You have " + playerMoney(state$.value) + " euros.",
        "Opponent has " + aiMoney(state$.value) + " euros.",
      ];

      return addMessage({
        logger: newLogger,
      });
    })
  );
const nextPhaseLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(phaseAdvanced.type),
    map(() => {
      const newLogger = [...logger(state$.value), "NEXT TURN."];

      return addMessage({
        logger: newLogger,
      });
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
