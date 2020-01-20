import React from 'react';

import './ArticleView.less';

/**
 * Simple view that centers a title and takes children
 *
 * @param props
 * @returns {*}
 * @class
 */
export const ArticleView = ({ children, title }) => (
  <div className="mw-article-view">
    <h1 className="mw-article-view-title">{title}</h1>
    {children}
  </div>
);
