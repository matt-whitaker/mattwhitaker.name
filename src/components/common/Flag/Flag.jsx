import PropTypes from "prop-types";
import React from "react";

import "./Flag.less";

export default class Flag extends React.PureComponent {
  static FLAG_TYPES = {
    LEFT: "left",
    RIGHT: "right"
  };

  static propTypes = {
    type: PropTypes.oneOf(Object.values(Flag.FLAG_TYPES))
  };

  render() {
    const { type, children, className } = this.props;
    const klassName = className ? ` ${className}` : '';
    return <div className={`mw-flag mw-flag-${type}${klassName}`}>{children}</div>;
  }
}