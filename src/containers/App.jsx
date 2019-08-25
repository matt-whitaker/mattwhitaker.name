import AppRouter from '../routing/routers/AppRouter';
import AppRoutes from '../routing/routes/AppRoutes';
import React from 'react';
import Shell from '../components/shell/Shell/Shell';

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
export default class App extends React.Component {
  /**
   * @returns {React.Element} The high level component composition.
   */
  render() {
    return (
      <AppRouter>
        <Shell>
          <AppRoutes />
        </Shell>
      </AppRouter>
    );
  }
}
