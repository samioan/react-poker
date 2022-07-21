import { map } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { v4 as uuid } from "uuid";

import {
  playerHand,
  aiHand,
  playerBet,
  playerMoney,
  pot,
  phase,
  startGame,
  fold,
  raise,
  cardReplaced,
  advancePhase,
} from "models/game";

import { addMessage, addStartMessage } from "./actions";

import { PHASES } from "reference-data";
import { handCheck } from "lib/handCheck";
import compareHands from "models/game/utils/compareHands";

const startGameLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type),
    map(() =>
      addStartMessage([
        `${uuid()}.GAME STARTED`,
        `${uuid()}.You have ${handCheck(playerHand(state$.value))[1]}`,
      ])
    )
  );

const playerMoneyLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(startGame.type, raise.type),
    map(() =>
      addMessage([
        `${uuid()}.You have ${playerMoney(state$.value)} euros`,
        `${uuid()}.Your bet is ${playerBet(state$.value)} euros`,
      ])
    )
  );

const foldLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(fold.type),
    map(() =>
      addMessage([
        `${uuid()}.PLAYER FOLDS`,
        `${uuid()}.You have ${playerMoney(state$.value)} euros`,
      ])
    )
  );

const raiseLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(raise.type),
    map(() =>
      addMessage([
        `${uuid()}.PLAYER RAISES`,
        `${uuid()}.Pot is ${pot(state$.value)} euros`,
      ])
    )
  );

const replaceLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(cardReplaced.type),
    map(() =>
      addMessage([
        `${uuid()}.PLAYER TRADES A CARD`,
        `${uuid()}.You now have ${handCheck(playerHand(state$.value))[1]}`,
      ])
    )
  );

const checkLogEpic = (action$, state$) =>
  action$.pipe(
    ofType(advancePhase.type),
    map(() => {
      const gameMessage = (() => {
        switch (compareHands(playerHand(state$.value), aiHand(state$.value))) {
          case 1:
            return `${uuid()}.PLAYER WINS`;
          case 2:
            return `${uuid()}.PLAYER LOSES`;
          default:
            return `${uuid()}.TIE`;
        }
      })();

      switch (phase(state$.value)) {
        case PHASES.REPLACE_CARDS:
          return addMessage([
            `${uuid()}.PLAYER CHECKS`,
            `${uuid()}.You can now replace up to 3 cards`,
          ]);
        case PHASES.GAME_ENDED:
          return addMessage([
            gameMessage,
            `${uuid()}.You had ${handCheck(playerHand(state$.value))[1]}`,
            `${uuid()}.Opponent had ${handCheck(aiHand(state$.value))[1]}`,
            `${uuid()}.You have ${playerMoney(state$.value)} euros`,
          ]);
        default:
          return addMessage([`${uuid()}.NEXT TURN`]);
      }
    })
  );

export default combineEpics(
  startGameLogEpic,
  foldLogEpic,
  raiseLogEpic,
  replaceLogEpic,
  checkLogEpic,
  playerMoneyLogEpic
);

export {
  startGameLogEpic,
  foldLogEpic,
  raiseLogEpic,
  replaceLogEpic,
  checkLogEpic,
  playerMoneyLogEpic,
};
