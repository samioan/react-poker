import { pipe } from "rxjs";
import { map } from "rxjs/operators";

import { effect as effectSystemAction } from "../../actions";

const effect = (
  effectCreator,
  effectResponseAction,
  additionalResponseActions
) =>
  pipe(
    map((data) =>
      effectSystemAction({
        effectCreator: () => Promise.resolve(effectCreator(data)),
        effectResponseAction,
        additionalResponseActions,
      })
    )
  );

export default effect;
