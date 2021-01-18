import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { handCheckToMsg } from "lib/handCheck";
import { check, fold, raise, replace, startGame } from "models/game/actions";
import {
  aiBet,
  aiHand,
  aiMoney,
  deck,
  phase,
  playerBet,
  playerHand,
  playerMoney,
} from "models/game/selectors";

const withBoardProps = (Component) => (props) => {
  const {
    playerHand,
    deck,
    phase,
    playerMoney,
    playerBet,
    aiMoney,
    aiBet,
  } = props;

  const newProps = {
    ...props,
    playerStats: {
      money: playerMoney,
      bid: playerBet,
      strength: phase >= 1 ? handCheckToMsg(playerHand) : "Nothing",
    },
    aiStats: {
      money: aiMoney,
      bid: aiBet,
    },
    canReplaceCards: deck.length > 39,
    showPlayButton: phase === 0,
    showActionButtons: phase >= 1,
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
});

const mapDispatchToProps = (dispatch) => ({
  onClickPlayHandler: () => dispatch(startGame()),
  onClickFoldHandler: () => dispatch(fold()),
  onClickCheckHandler: () => dispatch(check()),
  onClickRaiseHandler: () => dispatch(raise()),
  onClickReplaceHandler: (card) => dispatch(replace(card)),
});

export { withBoardProps };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withBoardProps
);
