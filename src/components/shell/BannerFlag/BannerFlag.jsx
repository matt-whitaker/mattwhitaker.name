import React from "react";
import Flag from "../../common/Flag/Flag";

import "./BannerFlag.less"

export default class BannerFlag extends React.PureComponent {
  render() {
    return (
      <div className="mw-banner-flag">
        <Flag type={Flag.FLAG_TYPES.RIGHT} className="mw-banner-flag-outer">
          <Flag type={Flag.FLAG_TYPES.RIGHT} className="mw-banner-flag-inner" />
        </Flag>
        <h1 className="mw-banner-flag-title">mattwhitaker.name</h1>
      </div>
    );
  }
}