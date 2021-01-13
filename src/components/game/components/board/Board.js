import React from "react";
import { Hand, Buttons } from "./components";
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
  return (
    <div className="container">
      <div className="top-player">
        <div className="board-row">
          <Hand hand={aiHand} visible={false} />
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
          <Hand
            hand={playerHand}
            visible={true}
            onClick={onClickReplaceHandler}
          />
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
      <Buttons id={"Play"} onClick={onClickPlayHandler} visible={phase >=1 ? false : true}/>
      </div>

      <div className="buttons-row">
        <div className="board-row">
        <Buttons id={"Fold"} onClick={onClickFoldHandler} visible={phase >=1 ? true : false}/>
        <Buttons id={"Check"} onClick={onClickCheckHandler} visible={phase >=1 ? true : false}/>
        <Buttons id={"Raise"} onClick={onClickRaiseHandler} visible={phase >=1 ? true : false}/>
        </div>
      </div>

      <div className="buttons-row">
        <div className="board-row">
        <Buttons id={"Replace Cards"} onClick={onClickReplaceHandler} visible={deck.length > 40 ? true : false}/>
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
