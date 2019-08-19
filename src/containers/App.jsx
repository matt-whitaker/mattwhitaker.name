import React from 'react';
import AppRouter from '../routing/AppRouter';
import AppRoutes from '../routing/routes/AppRoutes';
import Shell from '../components/shell/Shell/Shell';

/**
 * App root wrapper.
 */
export default class App extends React.Component {
  /**
   * Returns high level component composition.
   * @return {*}
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
