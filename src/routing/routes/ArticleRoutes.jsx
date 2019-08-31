import ArticleRoute from "./ArticleRoute";
import React from "react";
import RemoteResource from "../../containers/remote/RemoteResource";
import { Route } from "react-router-dom";

import Cache from "../../utils/Cache";

const articlesManifestCache = Cache.create('articles:manifest');

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
export default class ArticleRoutes extends React.Component {
  /**
   * Transform the manifest data to better fit local needs
   * @param manifest
   * @returns {{index: *, paths: *}}
   */
  transformManifest(manifest) {
    return {
      ...manifest,
      index: manifest.articles.reduce((map, article) => {
        return map.set(article.slug, article);
      }, new Map()),
      paths: manifest.articles.map(({ slug }) => `/article/${slug}`)
    };
  }

  /**
   * Render the article routes explicitly defined in the manifest
   * @param manifest
   * @returns {*}
   */
  renderManifestRoutes(manifest) {
    return (
      <Route
        exact
        path={manifest.paths}
        render={(props) => (
          <ArticleRoute manifest={manifest} {...props} />
        )}
      />
    );
  }

  /**
   * Render manifest routes
   * @returns {React.Element} The articles' route
   */
  render() {
    return (
      <RemoteResource
        cache={articlesManifestCache}
        url="/articles/manifest.json"
        transform={this.transformManifest}
        render={this.renderManifestRoutes}
      />
    );
  }
}