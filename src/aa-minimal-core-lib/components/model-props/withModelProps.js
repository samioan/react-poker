import { connect } from 'react-redux';

import { separatePropCreators } from './utils';

const EMPTY_OBJ = {};

const createProps = (statePropsCreators) => (state, ownProps) =>
  Object.entries(statePropsCreators).reduce((props, [key, propSelector]) => {
    props[key] = propSelector(state, ownProps);
    return props;
  }, {});

const createActionProps = (actionPropsCreators) => (dispatch, ownProps) =>
  Object.entries(actionPropsCreators).reduce((props, [key, action]) => {
    props[key] = (...args) => dispatch(action(...args, ownProps));
    return props;
  }, {});

const withProps = (propsCreators = EMPTY_OBJ, mergeProps, config) => {
  const { statePropsCreators, actionPropsCreators } = separatePropCreators(
    propsCreators,
  );

  return connect(
    createProps(statePropsCreators || EMPTY_OBJ),
    createActionProps(actionPropsCreators || EMPTY_OBJ),
    mergeProps,
    config,
  );
};

export default withProps;
