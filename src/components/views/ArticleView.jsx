import React from "react";

/**
 * Simple view that centers a title and takes children
 * @param props
 * @returns {*}
 * @constructor
 */
export const ArticleView = ({ children, title }) => (
  <div className="mw-article">
    <h1 className="mw-article-title">{title}</h1>
    {children}
  </div>
);