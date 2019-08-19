import React from 'react';
import Shell from '../components/shell/Shell/Shell';

/**
 * Stub container for the Shell component.
 */
export default class AppShell extends React.PureComponent {
  /**
   * Returns the content wrapped in the Shell.
   * @return {*}
   */
  render() {
    return (
      <Shell>
        {this.props.children}
      </Shell>
    );
  }
}
