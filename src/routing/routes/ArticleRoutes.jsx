import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import ArticleView from "../../views/Article/Article";

/**
 * Provide articles manifest to ArticleRoutes
 */
export const connectArticleRoutes = connect(
  ({ articles }) => ({ manifest: articles.manifest })
);


/**
 * ArticleRoutes
 *
 * Load manifest and generate routes
 *
 * Usage:
 * ```
 * <ArticleRoutes />
 * ```
 */
export const ArticleRoutes = connectArticleRoutes(({ manifest }) => (
  <Route
    exact
    path={manifest ? manifest.paths: []}
    render={(_props) => console.log("IT RENDERS") || (
      <Route
        path="/article/*"
        render={(props) => <ArticleView {..._props} {...props} manifest={manifest} />}
      />
    )}
  />
));