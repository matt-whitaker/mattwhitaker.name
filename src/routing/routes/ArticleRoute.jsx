import React from "react";
import {Route} from "react-router-dom";
import Article from "../../views/Article/Article";

/**
 * ArticleRoute
 *
 * Route component which loads markdown based on the slug and renders it.
 *
 * Usage:
 * ```
 * <ArticleRoute />
 * ```
 */
export default class ArticleRoute extends React.Component {
  /**
   * @returns {React.Element}
   * Render a Route which takes the slug from the URL, loads the corresponding markdown, and renders it.
   */
  render() {
    return (
      <Route
        path="/article/*"
        render={(props) => <Article {...this.props} {...props} />}
      />
    );
  }
}