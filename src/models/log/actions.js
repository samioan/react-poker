const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const checkLog = Action("CHECK_LOG");
export const startGameLog = Action("START_GAME_LOG");
export const foldLog = Action("FOLD_LOG");
export const raiseLog = Action("RAISE_LOG");
export const replaceLog = Action("REPLACE_LOG");
export const nextPhaseLog = Action("NEXT_PHASE_LOG");
