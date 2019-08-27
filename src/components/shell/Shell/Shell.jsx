import React from "react";

import "../../../less/reset";
import "./Shell.less";

/**
 * Shell
 *
 * Root component for the shell of the application
 *
 * Usage:
 * ```
 * <Shell />
 * ```
 */
export default class Shell extends React.PureComponent {
  /**
   * @returns {React.Element} The shell subcomponents
   */
  render() {
    return (
      <div className="mw-shell">
        {this.props.children}
      </div>
    );
  }
}