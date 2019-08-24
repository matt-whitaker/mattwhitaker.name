import React from "react";

import "./Shell.less";

/**
 * Root component for the shell of the application
 *
 * @example
 * ```
 * <Shell />
 * ```
 */
export default class Shell extends React.PureComponent {
  /**
   * Render the shell subcomponents
   * @returns {React.Element}
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