import './Banner.less';

import React from 'react';
import BannerFlag from '../../shell/BannerFlag/BannerFlag';
import BannerNav from '../BannerNav/BannerNav';

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
        <BannerFlag/>
        <BannerNav/>
      </div>
    );
  }
}
