import React from "react";
import { Card, Deck, Replace, Fold, Check, Raise } from "./components";
import { connect } from "react-redux";

import handCheck from "lib/handCheck";
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
    return phase >= 4 ? null : <Deck onClick={onClickPlayHandler} />;
  };

  const renderReplaceCardButton = () => {
    if (phase <= 2 || phase >= 4) {
      return null;
    } else return <Replace onClick={onClickReplaceHandler} />;
  };

  const renderFoldButton = () => {
    if (phase !== 2 && phase < 4) {
      return null;
    } else return <Fold onClick={onClickFoldHandler} />;
  };

  const renderCheckButton = () => {
    if (phase !== 2 && phase < 4) {
      return null;
    } else return <Check onClick={onClickCheckHandler} />;
  };

  const renderRaiseButton = () => {
    if (playerMoney === playerBet || (phase !== 2 && phase < 4)) {
      return null;
    } else return <Raise onClick={onClickRaiseHandler} />;
  };

  return (
    <div className="container">
      <div className="top-player">
        <div>{renderBuildDeckButton()}</div>
        <h2>Deck: {deck}</h2>
        <div className="board-row">
          {deck.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <div className="board-row">
          {renderFoldButton()}
          {renderCheckButton()}
          {renderRaiseButton()}
        </div>
        <div className="board-row">
          {renderReplaceCardButton(0)}
          {renderReplaceCardButton(1)}
          {renderReplaceCardButton(2)}
          {renderReplaceCardButton(3)}
          {renderReplaceCardButton(4)}
        </div>
        <div className="board-row">
          <h2>Player's Hand: {playerHand}</h2>
          <h2>, Player's Money: {playerMoney}</h2>
          <h2>, Player's Bet: {playerBet}</h2>
        </div>
        <div className="board-row">
          {playerHand.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <h2>Player's Strength: {handCheck(playerHand)}</h2>
      </div>
      <div className="bottom-player">
        <div className="board-row">
          <h2>Opponent's Hand: {aiHand}</h2>
          <h2>, Opponent's Money: {aiMoney}</h2>
          <h2>, Opponent's Bet: {aiBet}</h2>
        </div>
        <div className="board-row">
          {aiHand.map((card) => (
            <Card card={card} />
          ))}
        </div>
        <h2>Opponent's Strength: {handCheck(aiHand)}</h2>
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
  onClickPlayHandler: dispatch(startGame()),
  onClickFoldHandler: dispatch(fold()),
  onClickCheckHandler: dispatch(check()),
  onClickRaiseHandler: dispatch(raise()),
  onClickReplaceHandler: dispatch(replace()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Board);
