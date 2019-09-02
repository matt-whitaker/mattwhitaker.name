import PropTypes from "prop-types";
import React from "react";

import "./Flag.less";

/**
 * Creates one of those sideways flag lookin' things.
 * Can be provided content to expand the width, or you can apply a className.
 */
export default class Flag extends React.PureComponent {
  /**
   * Which direction does the flag fly?
   * @type {{LEFT: "left", RIGHT: "right"}}
   */
  static FLAG_TYPES = {
    LEFT: "left",
    RIGHT: "right",
  };

  /**
   * Flag props definitions
   */
  static propTypes = {
    /**
     * @enum FLAG_TYPES
     */
    type: PropTypes.oneOf(Object.values(Flag.FLAG_TYPES)),
  };

  /**
   * Render the flag
   * @returns {React.Element}
   */
  render() {
    const { type, children, className } = this.props;
    const klassName = className ? ` ${className}` : '';
    return <div className={`mw-flag mw-flag-${type}${klassName}`}>{children}</div>;
  }
}