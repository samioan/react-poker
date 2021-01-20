import React from "react";
import { Hand, Button, Stats, Log } from "./components";

import withBoardProps from "./withBoardProps";

const Board = ({
  aiHand,
  playerHand,
  playerStats,
  aiStats,
  gameStats,
  canReplaceCards,
  showPlayButton,
  showActionButtons,
  onClickPlayHandler,
  onClickReplaceHandler,
  onClickFoldHandler,
  onClickCheckHandler,
  onClickRaiseHandler,
  showNextPhaseButton,
  onClickNextPhaseHandler,
  showAiCards,
  logStats,
}) => (
  <div className="container">
    <div className="top-player">
      <div className="board-row">
        <Hand
          hand={aiHand}
          visible={showAiCards ? true : false}
          onClick={() => {}}
        />
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
      {showPlayButton && <Button id={"Play"} onClick={onClickPlayHandler} />}
      {showNextPhaseButton && (
        <Button id={"Next Turn"} onClick={onClickNextPhaseHandler} />
      )}
    </div>

    <div className="buttons-row">
      <div className="board-row">
        {showActionButtons && (
          <>
            <Button id={"Fold"} onClick={onClickFoldHandler} />
            <Button id={"Check"} onClick={onClickCheckHandler} />
            <Button id={"Raise"} onClick={onClickRaiseHandler} />
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
