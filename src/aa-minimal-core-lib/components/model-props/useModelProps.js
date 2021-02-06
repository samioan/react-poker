import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import { separatePropCreators } from "./utils";

const EMPTY_OBJ = {};

const createStateProps = (statePropsCreators = EMPTY_OBJ) => (state) =>
  Object.entries(statePropsCreators).reduce(
    (stateProps, [key, propSelector]) => {
      const newStateProps = {
        ...stateProps,
        [key]: propSelector(state),
      };

      return newStateProps;
    },
    {}
  );

const useModelProps = (propsCreators = EMPTY_OBJ) => {
  const { statePropsCreators, actionPropsCreators } = separatePropCreators(
    propsCreators
  );

  const stateProps = useSelector(
    createStateProps(statePropsCreators),
    shallowEqual
  );

  const dispatch = useDispatch();

  const actionProps = useMemo(
    () => bindActionCreators(actionPropsCreators, dispatch),
    []
  );

  return { ...stateProps, ...actionProps };
};

export default useModelProps;
