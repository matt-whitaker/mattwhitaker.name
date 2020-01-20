import React from 'react';
import { Provider as ReduxProvider, connect } from 'react-redux';

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
export const App = connectApp(class App extends React.PureComponent {
  componentDidMount() {
    const { initialize } = this.props;

    initialize();
  }

  render() {
    return (
      <AppRouter>
        <Shell>
          <AppRoutes/>
        </Shell>
      </AppRouter>
    );
  }
});
