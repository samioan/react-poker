import React from "react";

import { Button } from "components";

import { Hand, Stats, Log, ActionButtons } from "./components";
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

    <ActionButtons
      showPlayButton={showPlayButton}
      showActionButtons={showActionButtons}
      showNextPhaseButton={showNextPhaseButton}
      startGame={startGame}
      advancePhase={advancePhase}
      actionButtons={actionButtons}
    />

    <Log list={logMessages} />
  </div>
);

export { Board };
export default withBoardProps(Board);
