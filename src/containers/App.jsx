import AppRouter from '../routing/routers/AppRouter';
import AppRoutes from '../routing/routes/AppRoutes';
import React from 'react';
import Shell from '../components/shell/Shell/Shell';

/**
 * App root wrapper.
 *
 * @exmaple
 * ```
 * <App />
 * ```
 */
export default class App extends React.Component {
  /**
   * Returns high level component composition.
   * @return {React.Element}
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
