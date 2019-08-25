import React from 'react';
import Shell from '../components/shell/Shell/Shell';

/**
 * AppShell
 *
 * Stub container for the Shell component.
 *
 * Usage:
 * ```
 * <AppShell />
 * ```
 */
export default class AppShell extends React.PureComponent {
  /**
   * @returns {React.Element} The shell
   */
  render() {
    return (
      <Shell>
        {this.props.children}
      </Shell>
    );
  }
}
