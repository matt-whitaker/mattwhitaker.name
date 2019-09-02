import React from "react";

import "./Body.less";
import BodyNav from "../BodyNav/BodyNav";

/**
 * Wrapper for the main content
 */
export default class Body extends React.Component {
  /**
   * Render the Body
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="mw-body">
        <BodyNav/>
        {this.props.children}
      </div>
    )
  }
}