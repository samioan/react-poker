import { from } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";
import { ofType } from "redux-observable";

import { effect } from "../actions/";

const effectEpic = (action$) =>
  action$.pipe(
    ofType(effect.type),
    mergeMap(
      ({
        payload: {
          effectCreator,
          effectResponseAction,
          additionalResponseActions = [],
        },
      }) =>
        from(effectCreator()).pipe(
          mergeMap((data) => {
            const successActions = [];

            if (effectResponseAction && effectResponseAction.succeeded) {
              successActions.push(effectResponseAction.succeeded(data));
            }

            additionalResponseActions.map((action) =>
              typeof action === "function"
                ? successActions.push(action(data))
                : successActions.push(action)
            );

            return successActions;
          }),
          catchError((error) =>
            effectResponseAction && effectResponseAction.failed
              ? [effectResponseAction.failed(error)]
              : []
          )
        )
    )
  );

export default effectEpic;
