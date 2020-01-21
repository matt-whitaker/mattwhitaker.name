import React from 'react';

import './BasicView.less';

/**
 *
 * @param {{}} props
 * @param {React.Element} props.children
 * @returns {React.Element}
 * @class
 */
export const BasicView = ({ children }) => (
  <div class="mw-basic-view">
    {children}
  </div>
);
