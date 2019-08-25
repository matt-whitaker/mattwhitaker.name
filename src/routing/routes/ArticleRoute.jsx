import React from "react";
import {Route} from "react-router-dom";
import RemoteResource from "../../containers/remote/RemoteResource";
import Markdown from "../../components/common/Markdown/Markdown";

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
    return <Route
      path="/article/*"
      render={({match}) => (
        <RemoteResource
          url={`/articles/${match.params[0]}.md`}
          render={(markdown) => <Markdown>{markdown}</Markdown>}
        />
      )}
    />;
  }
}