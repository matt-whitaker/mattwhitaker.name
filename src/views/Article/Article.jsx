import { boundClass } from 'autobind-decorator'
import Markdown from "../../components/common/Markdown/Markdown";
import RemoteResource from "../../containers/remote/RemoteResource";
import React from "react";
import Cache from "../../utils/Cache";
import "./Article.less";

const articleCache = Cache.create('articles:article');

/**
 * Article view
 */
@boundClass
export default class Article extends React.Component {
  /**
   * Render the article
   * @param markdown
   * @returns {*}
   */
  renderArticle(markdown) {
    const { match, manifest } = this.props;

    return (
      <div className="mw-article">
        <h1 className="mw-article-title" dangerouslySetInnerHTML={{ __html: manifest.index.get(match.params[0]).title }}></h1>
        <Markdown>{markdown}</Markdown>
      </div>
    );
  }

  /**
   * Render the Article
   * @returns {*}
   */
  render() {
    const { match } = this.props;

    return (
      <RemoteResource
        cache={articleCache}
        url={`/articles/${match.params[0]}.md`}
        render={this.renderArticle}
      />
    );
  }
}