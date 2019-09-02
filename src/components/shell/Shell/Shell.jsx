import React from "react";

import "../../../less/reset";
import "./Shell.less";
import Banner from "../Banner/Banner";
import Body from "../Body/Body";
import ScrollWatcher from "../ScrollWatcher/ScrollWatcher";

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
      <ScrollWatcher>
        <div className="mw-shell">
          <Banner/>
          <Body>
          {this.props.children}
          </Body>
        </div>
      </ScrollWatcher>
    );
  }
}