import React from "react";

import { Button } from "components";

import { Hand, Stats, Log } from "./components";
import withBoardProps from "./withBoardProps";

import "./board.css";

const Board = ({
  aiHand,
  playerHand,
  playerStats,
  aiStats,
  gameStats,
  canReplaceCards,
  showPlayButton,
  showActionButtons,
  showNextPhaseButton,
  showAiCards,
  onClickPlayHandler,
  onClickReplaceHandler,
  onClickFoldHandler,
  onClickCheckHandler,
  onClickRaiseHandler,
  onClickNextPhaseHandler,
  logStats,
}) => (
  <div className="container">
    <div className="top-player">
      <div className="board-row">
        <Hand hand={aiHand} visible={showAiCards} />
      </div>
    </div>

    <div className="buttons-row">
      <Stats {...aiStats} />
    </div>

    <div className="buttons-row">
      <Stats {...gameStats} />
    </div>

    <div className="bottom-player">
      <div className="board-row">
        <Hand
          hand={playerHand}
          visible={true}
          onClick={canReplaceCards ? onClickReplaceHandler : () => {}}
        />
      </div>
    </div>

    <div className="buttons-row">
      <Stats {...playerStats} />
    </div>

    <div className="buttons-row">
      {showPlayButton && <Button label="Play" onClick={onClickPlayHandler} />}
      {showNextPhaseButton && (
        <Button label="Next Turn" onClick={onClickNextPhaseHandler} />
      )}
    </div>

    <div className="buttons-row">
      <div className="board-row">
        {showActionButtons && (
          <>
            <Button label="Fold" onClick={onClickFoldHandler} />
            <Button label="Check" onClick={onClickCheckHandler} />
            <Button label="Raise" onClick={onClickRaiseHandler} />
          </>
        )}
      </div>
    </div>
    <div className="log-row">
      <Log list={logStats.logger} />
    </div>
  </div>
);

export { Board };
export default withBoardProps(Board);
