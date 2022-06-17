import React from "react";
import { compose } from "redux";

import { handCheck } from "lib/handCheck";
import {
  check,
  fold,
  raise,
  replace,
  startGame,
  advancePhase,
  aiBet,
  aiHand,
  aiMoney,
  deck,
  phase,
  playerBet,
  playerHand,
  playerMoney,
  pot,
} from "models/game";
import { logger } from "models/log";
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
    fold,
    check,
    raise,
  } = props;

  const playerStats = {
    money: playerMoney,
    bid: playerBet,
    strength: phase >= 1 ? handCheck(playerHand)[1] : null,
  };
  const aiStats = {
    money: aiMoney,
    bid: aiBet,
  };
  const gameStats = {
    pot,
  };
  const logStats = {
    logger,
  };

  const canReplaceCards = deck.length > 39 && phase === 2;
  const showPlayButton = phase === 0 || phase === 4;
  const showActionButtons = phase === 1 || phase === 3;
  const showNextPhaseButton = phase >= 2 && phase < 3;
  const showAiCards = phase === 4;

  const actionButtons = [
    { label: "Fold", onClick: fold },
    { label: "Check", onClick: check },
    { label: "Raise", onClick: raise },
  ];

  const newProps = {
    ...props,
    playerStats,
    aiStats,
    gameStats,
    logStats,
    canReplaceCards,
    showPlayButton,
    showActionButtons,
    showNextPhaseButton,
    showAiCards,
    actionButtons,
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
    startGame,
    fold,
    check,
    raise,
    advancePhase,
    replace,
  }),
  withBoardProps
);
