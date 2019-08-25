import React from "react";

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
        <h1>{process.env.SITE_TITLE}</h1>
        <h2>"{process.env.SITE_SUBTITLE}"</h2>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}