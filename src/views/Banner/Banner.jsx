import "./Banner.less";

import React from "react";
import {Link} from "react-router-dom";
import Flag from "../../components/common/Flag/Flag";
import BannerFlag from "../../components/shell/BannerFlag/BannerFlag";

/**
 * Banner
 *
 * Banner view component
 *
 * Usage:
 * ```
 * <Banner />
 * ```
 */
export default class Banner extends React.Component {
  /**
   * @returns Banner view root component
   */
  render() {
    return (
      <div className="mw-banner">
        <Link to="/" className="mw-banner-link">
          <BannerFlag />
        </Link>
      </div>
    );
  }
}