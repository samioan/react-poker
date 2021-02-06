const EMPTY_OBJ = {};

const separatePropCreators = (propsCreators = EMPTY_OBJ) =>
  Object.entries(propsCreators).reduce(
    (creators, [key, creator]) =>
      creator.type
        ? {
            ...creators,
            actionPropsCreators: {
              ...creators.actionPropsCreators,
              [key]: creator,
            },
          }
        : {
            ...creators,
            statePropsCreators: {
              ...creators.statePropsCreators,
              [key]: creator,
            },
          },
    { statePropsCreators: EMPTY_OBJ, actionPropsCreators: EMPTY_OBJ },
  );

export default separatePropCreators;
