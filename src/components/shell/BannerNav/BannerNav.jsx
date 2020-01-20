import * as React from 'react';

import './BannerNav.less';

/**
 * Banner navigation
 */
export default class BannerNav extends React.PureComponent {
  /**
   * Render the BannerNav
   *
   * @returns {React.Element}
   */
  render() {
    return (
      <nav className="mw-banner-nav">
        <a className="mw-banner-nav-item" href={process.env.GITHUB_URL}>
          <i className="fab fa-github"/>
        </a>
        <a className="mw-banner-nav-item" href={process.env.LINKEDIN_URL}>
          <i className="fab fa-linkedin-in"/>
        </a>
      </nav>
    );
  }
}
