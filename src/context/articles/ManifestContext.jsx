import React from "react";
import RemoteResource from "../../containers/remote/RemoteResource";

import Cache from "../../utils/Cache";
import autobind from "autobind-decorator";

/**
 * Cache for the article manifest
 */
const articlesManifestCache = Cache.create('articles:manifest');

/**
 * Context for the article manifest
 */
const context = React.createContext({
  articles: [],
  index: {},
  paths: [],
});

export default context;

/**
 * Consumer for the article manifest
 */
export const ManifestConsumer = context.Consumer;

/**
 * Loads and provides the article manifest
 */
@autobind
export class ManifestProvider extends React.PureComponent {
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
      paths: manifest.articles.map(({ slug }) => `/article/${slug}`),
    };
  }

  /**
   * Simple method to return the provided children
   * @returns {React.Element}
   */
  renderChildren(manifest) {
    return (
      <context.Provider value={manifest}>
        {this.props.children}
      </context.Provider>
    );
  }

  /**
   * Render The Provider
   * @returns {React.Element}
   */
  render() {
    return (
      <RemoteResource
        cache={articlesManifestCache}
        url="/articles/manifest.json"
        transform={this.transformManifest}
        render={this.renderChildren}
      />
    )
  }
}