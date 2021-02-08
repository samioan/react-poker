import React from "react";
import { compose } from "redux";

import { handCheckToMsg } from "lib/handCheck";
import {
  check,
  fold,
  raise,
  replace,
  startGame,
  nextPhase,
} from "models/game/actions";
import {
  aiBet,
  aiHand,
  aiMoney,
  deck,
  phase,
  playerBet,
  playerHand,
  playerMoney,
  pot,
} from "models/game/selectors";
import { logger } from "models/log/selectors";
import { withModelProps } from "aa-minimal-core-lib/components/model-props";

const withBoardProps = (Component) => (props) => {
  const {
    playerHand,
    deck,
    phase,
    playerMoney,
    playerBet,
    aiMoney,
    aiBet,
    pot,
    logger,
  } = props;

  const newProps = {
    ...props,
    playerStats: {
      money: playerMoney,
      bid: playerBet,
      strength: phase >= 1 ? handCheckToMsg(playerHand) : null,
    },
    aiStats: {
      money: aiMoney,
      bid: aiBet,
    },
    gameStats: {
      pot: pot,
    },
    logStats: {
      logger,
    },
    canReplaceCards: deck.length > 39 && phase === 2,
    showPlayButton: phase === 0 || phase === 4,
    showActionButtons: phase === 1 || phase === 3,
    showNextPhaseButton: phase >= 2 && phase < 3,
    showAiCards: phase === 4,
  };

  return <Component {...newProps} />;
};

export { withBoardProps };
export default compose(
  withModelProps({
    aiBet,
    aiHand,
    aiMoney,
    deck,
    phase,
    playerBet,
    playerHand,
    playerMoney,
    pot,
    logger,
    onClickPlayHandler: startGame,
    onClickFoldHandler: fold,
    onClickCheckHandler: check,
    onClickRaiseHandler: raise,
    onClickNextPhaseHandler: nextPhase,
    onClickReplaceHandler: replace,
  }),
  withBoardProps
);
