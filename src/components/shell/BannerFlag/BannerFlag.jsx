import React from "react";
import Flag from "../../common/Flag/Flag";

import "./BannerFlag.less"
import {Link} from "react-router-dom";

/**
 * Branding with flags
 */
export default class BannerFlag extends React.PureComponent {
  /**
   * Render the BannerFlag
   * @returns {React.Element}
   */
  render() {
    return (
      <div className="mw-banner-flag">
        <Flag type={Flag.FLAG_TYPES.RIGHT} className="mw-banner-flag-outer">
          <Flag type={Flag.FLAG_TYPES.RIGHT} className="mw-banner-flag-inner" />
        </Flag>
        <Link to="/" className="mw-banner-flag-title">
          <h1>mattwhitaker.name</h1>
        </Link>
      </div>
    );
  }
}