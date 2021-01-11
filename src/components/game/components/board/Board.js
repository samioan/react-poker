import React from "react";
import { Deck, Replace, Fold, Check, Raise, Hand } from "./components";
import { connect } from "react-redux";

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

const Board = ({
  aiBet,
  aiHand,
  aiMoney,
  deck,
  phase,
  playerBet,
  playerHand,
  playerMoney,
  onClickPlayHandler,
  onClickReplaceHandler,
  onClickFoldHandler,
  onClickCheckHandler,
  onClickRaiseHandler,
}) => {
  const renderBuildDeckButton = () => {
    return phase >= 1 ? null : <Deck onClick={onClickPlayHandler} />;
  };

  const renderReplaceCardButton = () => {
    return deck.length > 40 ? (
      <Replace onClick={onClickReplaceHandler} />
    ) : null;
  };

  const renderFoldButton = () => {
    return phase >= 1 ? <Fold onClick={onClickFoldHandler} /> : null;
  };

  const renderCheckButton = () => {
    return phase >= 1 ? <Check onClick={onClickCheckHandler} /> : null;
  };

  const renderRaiseButton = () => {
    return phase >= 1 ? <Raise onClick={onClickRaiseHandler} /> : null;
  };

  return (
    <div className="container">
      <div className="top-player">
        <div className="board-row">
          <Hand hand={aiHand} />
        </div>
      </div>

      <div className="buttons-row">
        <div className="board-row">
          <h2 className="text">Money: {aiMoney}</h2>
          <h2 className="text">Bid: {aiBet}</h2>
          <h2 className="text">
            Strength: {phase >= 1 ? handCheckToMsg(aiHand) : null}
          </h2>
        </div>
      </div>

      <div className="bottom-player">
        <div className="board-row">
          <Hand hand={playerHand} />
        </div>
      </div>

      <div className="buttons-row">
        <div className="board-row">
          <h2 className="text">Money: {playerMoney}</h2>
          <h2 className="text">Bid: {playerBet}</h2>
          <h2 className="text">
            Strength: {phase >= 1 ? handCheckToMsg(playerHand) : null}
          </h2>
        </div>
      </div>

      <div className="buttons-row">
        <div>{renderBuildDeckButton()}</div>
      </div>

      <div className="buttons-row">
        <div className="board-row">
          {renderFoldButton()}
          {renderCheckButton()}
          {renderRaiseButton()}
        </div>
      </div>

      <div className="buttons-row">
        <div className="board-row">
          {renderReplaceCardButton(0)}
          {renderReplaceCardButton(1)}
          {renderReplaceCardButton(2)}
          {renderReplaceCardButton(3)}
          {renderReplaceCardButton(4)}
        </div>
      </div>
    </div>
  );
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
  onClickReplaceHandler: () => dispatch(replace()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Board);
