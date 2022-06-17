import React from "react";

import { Button } from "components";

import { Hand, Stats, Log } from "./components";
import withBoardProps from "./withBoardProps";

import classes from "./Board.module.css";

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
  startGame,
  fold,
  check,
  raise,
  advancePhase,
  replace,
  logStats,
  actionButtons,
}) => (
  <div className={classes.container}>
    <Hand hand={aiHand} visible={showAiCards} />

    <Stats {...aiStats} />

    <Stats {...gameStats} />

    <Hand
      hand={playerHand}
      visible={true}
      onClick={canReplaceCards ? replace : () => {}}
    />

    <Stats {...playerStats} />

    {showPlayButton && <Button label="Play" onClick={startGame} />}
    {showNextPhaseButton && <Button label="Next Turn" onClick={advancePhase} />}

    {showActionButtons && (
      <div className={classes.buttonsContainer}>
        {actionButtons.map(({ label, onClick }) => (
          <Button key={label} label={label} onClick={onClick} />
        ))}
      </div>
    )}

    <Log list={logStats.logger} />
  </div>
);

export { Board };
export default withBoardProps(Board);
