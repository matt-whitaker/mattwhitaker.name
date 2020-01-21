import React from 'react';
import { connect } from 'react-redux';

import Shell from './components/shell/Shell/Shell';

import { AppRouter } from './routing/routers/AppRouter';
import { AppRoutes } from './routing/routes/AppRoutes';

import { initialize } from './ducks/initialize';

export const connectApp = connect(
  null,
  { initialize },
);

/**
 * App
 *
 * App root wrapper.
 *
 * Usage:
 * ```
 * <App />
 * ```
 */
export class App extends React.PureComponent {
  /**
   * Kick off action to initialize the app
   */
  componentDidMount() {
    const { initialize } = this.props;

    initialize();
  }

  /**
   * Render the app
   * @returns {React.Element}
   */
  render() {
    return (
      <AppRouter>
        <Shell>
          <AppRoutes/>
        </Shell>
      </AppRouter>
    );
  }

  static Connected = connectApp(App);
}
