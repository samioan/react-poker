import toJson from "enzyme-to-json";

import { shallow } from "enzyme";
import { Subject } from "rxjs";
import { ActionsObservable, StateObservable } from "redux-observable";

const testEpic = (epic, initialState = {}, deps = {}) => {
  const actionSubject = new Subject();
  const action$ = new ActionsObservable(actionSubject);
  const emitAction = actionSubject.next.bind(actionSubject);
  const stateSubject = new Subject();
  const state$ = new StateObservable(stateSubject, initialState);
  const emitState = stateSubject.next.bind(stateSubject);

  const epicEmissions = [];
  epic(action$, state$, deps).subscribe((event) => epicEmissions.push(event));

  return { emitAction, emitState, epicEmissions };
};

const shallowSnapshot = (Component) =>
  toJson(shallow(Component), {
    mode: "shallow",
  });

const findByDataTestId = (wrapper, value) =>
  wrapper.find(`[data-test-id='${value}']`);

export { testEpic, shallowSnapshot, findByDataTestId };
