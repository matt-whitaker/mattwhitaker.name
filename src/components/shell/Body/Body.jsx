import React from "react";

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
      <div className="ac-body">
        {this.props.children}
      </div>
    )
  }
}