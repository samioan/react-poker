import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { getForecast } from "models/forecast/actions";
import { name, temp, description } from "models/forecast/selectors";

import "./forecast.css";

const withForecastProps = (Component) => (props) => {
  const { name, temp, description } = props;

  const newProps = {
    ...props,
    showMessage:
      temp < 16 ? "It's gonna be a cold day!" : "A nice and warm day!",
  };

  return <Component {...newProps} />;
};

const mapStateToProps = (state) => ({
  name: name(state),
  temp: temp(state),
  description: description(state),
});

const mapDispatchToProps = (dispatch) => ({
  onClickForecastHandler: () => dispatch(getForecast()),
});

export { withForecastProps };
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withForecastProps
);
