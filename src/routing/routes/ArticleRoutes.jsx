import ArticleRoute from "./ArticleRoute";
import React from "react";
import { Route } from "react-router-dom";
import { ManifestConsumer } from "../../context/articles/ManifestContext";


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
   * Render the article routes explicitly defined in the manifest
   * @param manifest
   * @returns {*}
   */
  renderManifestRoutes(manifest) {
    console.log("ArticleRoutes#renderManifestRoutes");
    console.log(manifest);
    return (
      <Route
        exact
        path={manifest.paths}
        render={(props) => console.log(props) || (
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
      <ManifestConsumer>
        {this.renderManifestRoutes}
      </ManifestConsumer>
    );
  }
}