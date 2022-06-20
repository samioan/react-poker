import { map, filter, mergeMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import { cloneDeep } from "lodash";

import {
  deck,
  playerHand,
  aiHand,
  changedPlayerHand,
  phase,
} from "./selectors";
import {
  replace,
  cardReplaced,
  check,
  playerWon,
  playerLost,
  playerTied,
  advancePhase,
  betsReset,
} from "./actions";

import compareHands from "./utils/compareHands";

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

const checkEpic = (action$, state$) =>
  action$.pipe(
    ofType(check.type),
    mergeMap(() => {
      const comparisonResult = compareHands(
        playerHand(state$.value),
        aiHand(state$.value)
      );

      const actions = [advancePhase()];

      if (phase(state$.value) === 3) {
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
      }
      return actions;
    })
  );

export default combineEpics(replaceEpic, checkEpic);

export { replaceEpic, checkEpic };
