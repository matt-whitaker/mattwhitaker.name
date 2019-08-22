import AppRouter from '../routing/AppRouter';
import AppRoutes from '../routing/routes/AppRoutes';
import React from 'react';
import Shell from '../components/shell/Shell/Shell';
import RemoteResource from "./remote/RemoteResource";

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
   * @returns {React.Element}
   */
  render() {
    return (
      <RemoteResource url="/articles/manifest.json">
        {(manifest) => console.log(manifest) || (
          <AppRouter>
            <Shell>
              <AppRoutes/>
              <p dangerouslySetInnerHTML={{ __html: JSON.stringify(manifest, null, 4) }} />
            </Shell>
          </AppRouter>
        )}
      </RemoteResource>
    );
  }
}
