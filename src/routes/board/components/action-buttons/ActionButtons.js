import React from "react";

import { Button } from "components";

import classes from "./ActionButtons.module.css";

const ActionButtons = ({
  showPlayButton,
  showActionButtons,
  showNextPhaseButton,
  startGame,
  advancePhase,
  actionButtons,
}) => (
  <>
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
  </>
);

export { ActionButtons };
export default ActionButtons;
