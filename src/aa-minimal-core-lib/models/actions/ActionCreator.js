import snakeCase from "lodash/snakeCase";

const ActionCreator = (namespacedType) => {
  const actionCreatorFunc = (payload) => ({
    type: namespacedType,
    payload,
  });

  actionCreatorFunc.type = namespacedType;

  return actionCreatorFunc;
};

const EffectActionCreator = (namespace) => (type) => {
  const namespacedType = `${namespace}/${snakeCase(type).toUpperCase()}`;
  const action = ActionCreator(namespacedType);

  action.succeeded = ActionCreator(`${namespacedType}_SUCCEEDED`);
  action.failed = ActionCreator(`${namespacedType}_FAILED`);

  return action;
};

export default EffectActionCreator;
