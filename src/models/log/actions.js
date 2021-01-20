const Action = (type) => {
  const actionCreator = (payload) => ({
    type,
    payload,
  });
  actionCreator.type = type;
  return actionCreator;
};

export const check = Action("CHECK");
export const startGame = Action("START_GAME");
export const fold = Action("FOLD");
export const raise = Action("RAISE");
export const replace = Action("REPLACE");
export const nextPhase = Action("NEXT_PHASE");
