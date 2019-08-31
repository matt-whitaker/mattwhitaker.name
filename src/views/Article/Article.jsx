import Markdown from "../../components/common/Markdown/Markdown";
import RemoteResource from "../../containers/remote/RemoteResource";
import React from "react";

import Cache from "../../utils/Cache";

const articleCache = Cache.create('articles:article');

export default class Article extends React.Component {
  constructor(props) {
    super(props);

    // TODO: create a base class to auto bind
    this.renderArticle = this.renderArticle.bind(this);
  }

  renderArticle(markdown) {
    const { match, manifest } = this.props;

    return (
      <div className="mw-article">
        <h1>{manifest.index.get(match.params[0]).title}</h1>
        <Markdown>{markdown}</Markdown>
      </div>
    );
  }

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