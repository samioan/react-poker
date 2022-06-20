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
  pot,
  canReplaceCards,
  showPlayButton,
  showActionButtons,
  showNextPhaseButton,
  showAiCards,
  startGame,
  advancePhase,
  replace,
  logMessages,
  actionButtons,
}) => (
  <div className={classes.container}>
    <Hand hand={aiHand} visible={showAiCards} />

    <Stats {...aiStats} />

    <Stats pot={pot} />

    <Hand
      hand={playerHand}
      visible
      onClick={canReplaceCards ? replace : () => {}}
    />

    <Stats {...playerStats} />

    {showPlayButton && <Button label="Play" onClick={startGame} />}
    {showNextPhaseButton && <Button label="Next Turn" onClick={advancePhase} />}

    {showActionButtons && (
      <div className={classes.buttonsContainer}>
        {actionButtons.map(({ label, onClick, disabled }) => (
          <Button
            key={label}
            label={label}
            onClick={onClick}
            disabled={disabled}
          />
        ))}
      </div>
    )}

    <Log list={logMessages} />
  </div>
);

export { Board };
export default withBoardProps(Board);
