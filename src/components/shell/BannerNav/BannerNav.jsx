import * as React from "react";

import "./BannerNav.less";

/**
 * Banner navigation
 */
export default class BannerNav extends React.PureComponent {
  /**
   * Render the BannerNav
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="mw-banner-nav">
        <a className="fab fa-github mw-banner-nav-item" href={process.env.GITHUB_URL} />
        <a className="fab fa-linkedin-in mw-banner-nav-item" href={process.env.LINKEDIN_URL} />
      </div>
    );
  }
}