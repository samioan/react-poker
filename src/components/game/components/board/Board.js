import React from "react";
import { Hand, Button, Stats } from "./components";

import withBoardProps from "./withBoardProps";

const Board = ({
  aiHand,
  playerHand,
  playerStats,
  aiStats,
  canReplaceCards,
  showPlayButton,
  showActionButtons,
  onClickPlayHandler,
  onClickReplaceHandler,
  onClickFoldHandler,
  onClickCheckHandler,
  onClickRaiseHandler,
}) => (
  <div className="container">
    <div className="top-player">
      <div className="board-row">
        <Hand hand={aiHand} visible={false} />
      </div>
    </div>

    <div className="buttons-row">
      <Stats {...aiStats} />
    </div>

    <div className="bottom-player">
      <div className="board-row">
        <Hand
          hand={playerHand}
          visible={true}
          onClick={
            canReplaceCards
              ? onClickReplaceHandler
              : () => {
                  alert("You cannot replace any more cards!");
                }
          }
        />
      </div>
    </div>

    <div className="buttons-row">
      <Stats {...playerStats} />
    </div>

    <div className="buttons-row">
      {showPlayButton && <Button id={"Play"} onClick={onClickPlayHandler} />}
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
  </div>
);

export { Board };
export default withBoardProps(Board);
