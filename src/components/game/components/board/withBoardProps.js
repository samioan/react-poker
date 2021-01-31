import React from "react";
import { connect } from "react-redux";
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

const mapStateToProps = (state) => ({
  aiBet: aiBet(state),
  aiHand: aiHand(state),
  aiMoney: aiMoney(state),
  deck: deck(state),
  phase: phase(state),
  playerBet: playerBet(state),
  playerHand: playerHand(state),
  playerMoney: playerMoney(state),
  pot: pot(state),
  logger: logger(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
  onClickFoldHandler: () => dispatch(fold()),
  onClickCheckHandler: () => dispatch(check()),
  onClickRaiseHandler: () => dispatch(raise()),
  onClickReplaceHandler: (card) => dispatch(replace(card)),
  onClickNextPhaseHandler: () => dispatch(nextPhase()),
});

export { withBoardProps };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBoardProps
);
