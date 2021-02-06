import React, { useState } from 'react';

const withComponentState = (initialState) => (Component) => (props) => {
  const [state, setState] = useState(initialState);

  return <Component {...props} state={state} setState={setState} />;
};

export default withComponentState;
