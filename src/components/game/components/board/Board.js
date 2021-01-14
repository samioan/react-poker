import React from "react";
import { Hand, Button, Stats } from "./components";
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
        <Stats
          money={aiMoney}
          bid={aiBet}
          strength={phase >= 1 ? handCheckToMsg(aiHand) : null}
          visible={true}
        />
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
        <Stats
          money={playerMoney}
          bid={playerBet}
          strength={phase >= 1 ? handCheckToMsg(playerHand) : null}
          visible={true}
        />
      </div>

      <div className="buttons-row">
        {phase === 0 && <Button id={"Play"} onClick={onClickPlayHandler} />}
      </div>

      <div className="buttons-row">
        <div className="board-row">
          {phase >= 1 && <Button id={"Fold"} onClick={onClickFoldHandler} />}
          {phase >= 1 && <Button id={"Check"} onClick={onClickCheckHandler} />}
          {phase >= 1 && <Button id={"Raise"} onClick={onClickRaiseHandler} />}
        </div>
      </div>

      <div className="buttons-row">
        <div className="board-row">
          {deck.length > 40 && (
            <Button id={"Replace Cards"} onClick={onClickReplaceHandler} />
          )}
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
