import AppRouter from '../routing/routers/AppRouter';
import AppRoutes from '../routing/routes/AppRoutes';
import AppShell from './AppShell';
import React from 'react';

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
        <AppShell>
          <AppRoutes/>
        </AppShell>
      </AppRouter>
    );
  }
}
